#!/usr/bin/env python3
import json
import os
import re
import sys
from typing import cast

HEADINGS = ("What", "Why", "How to test", "Visuals", "Risks")
OPTIONAL_EMPTY = {
    "Visuals": frozenset({"n/a"}),
    "Risks": frozenset({"none"}),
}
PLACEHOLDER_PREFIX = re.compile(r"(todo|tbd)\b", re.IGNORECASE)
CHECKBOX_PREFIX = re.compile(r"^[ \t]*[-*][ \t]+\[[ xX]\][ \t]*", re.MULTILINE)
LIST_PREFIX = re.compile(r"^([-*+]|\d+\.)[ \t]+")
WRAP_MARKUP = re.compile(r"^[`*_~]+|[`*_~]+$")
HEADING = re.compile(r"^ {0,3}##\s+(.+?)(?:\s+#*)?\s*$")
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})")
FOOTER = re.compile(r"^made with\s+\[?cursor", re.IGNORECASE)


def main() -> None:
    issues = check_description(load_pr_body())

    if issues:
        print("\n".join(issues), file=sys.stderr)
        raise SystemExit(1)


def load_pr_body() -> str:
    path = os.environ.get("PR_BODY_PATH")

    if path:
        return read_body_file(path)

    payload = load_event_pull_request()

    return "" if payload is None else read_pull_request_body(payload)


def read_body_file(path: str) -> str:
    with open(path, encoding="utf-8") as handle:
        return handle.read()


def load_event_pull_request() -> dict[str, object] | None:
    with open(os.environ["GITHUB_EVENT_PATH"], encoding="utf-8") as handle:
        event = parse_json_object(json.load(handle))

    return None if event is None else parse_json_object(event.get("pull_request"))


def read_pull_request_body(payload: dict[str, object]) -> str:
    body = payload.get("body")

    return body if isinstance(body, str) else ""


def parse_json_object(value: object) -> dict[str, object] | None:
    return (
        cast(dict[str, object], value) if isinstance(value, dict) else None
    )


def check_description(body: str) -> list[str]:
    sections = parse_sections(
        remove_fenced_blocks(remove_comments(body))
    )
    issues: list[str] = []

    for heading in HEADINGS:
        if heading not in sections:
            issues.append(f"Missing ## {heading} section.")
            continue

        text = read_section_text(heading, sections[heading])

        if not text:
            issues.append(f"## {heading} needs more than a placeholder.")

    return issues


def remove_comments(body: str) -> str:
    parts: list[str] = []
    cursor = 0

    while True:
        start = body.find("<!--", cursor)

        if start == -1:
            parts.append(body[cursor:])
            break

        end = body.find("-->", start + 4)

        if end == -1:
            parts.append(body[cursor:start])
            break

        parts.append(body[cursor:start])
        cursor = end + 3

    return "".join(parts)


def remove_fenced_blocks(body: str) -> str:
    lines: list[str] = []
    fence: tuple[str, int] | None = None

    for line in body.splitlines():
        if fence is None:
            fence = read_opening_fence(line)

            if fence is None:
                lines.append(line)

            continue

        if closes_fence(line, fence):
            fence = None

    return "\n".join(lines)


def read_opening_fence(line: str) -> tuple[str, int] | None:
    match = FENCE.match(line)

    if match is None:
        return None

    marker = match.group(1)

    return marker[0], len(marker)


def closes_fence(line: str, fence: tuple[str, int]) -> bool:
    match = FENCE.match(line)

    if match is None:
        return False

    marker = match.group(1)
    char, length = fence

    if marker[0] != char or len(marker) < length:
        return False

    return line[match.end() :].strip() == ""


def parse_sections(body: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {}
    current = None

    for line in body.splitlines():
        match = HEADING.match(line)

        if match:
            current = match.group(1).strip()
            sections.setdefault(current, [])
            continue

        if current is not None:
            sections[current].append(line)

    return sections


def read_section_text(heading: str, lines: list[str]) -> str:
    text = CHECKBOX_PREFIX.sub("", "\n".join(lines)).strip()

    if heading == "Risks":
        text = remove_footer_lines(text)

    return "" if is_placeholder(heading, text) else text


def remove_footer_lines(text: str) -> str:
    kept = [
        line for line in text.splitlines() if not FOOTER.match(line.strip())
    ]

    return "\n".join(kept).strip()


def is_placeholder(heading: str, text: str) -> bool:
    normalized = normalize_placeholder(text)

    if PLACEHOLDER_PREFIX.match(normalized):
        return True

    lowered = normalized.lower()

    if lowered in {"n/a", "none"}:
        return lowered not in OPTIONAL_EMPTY.get(heading, frozenset())

    return False


def normalize_placeholder(text: str) -> str:
    first = text.splitlines()[0] if text else ""
    stripped = LIST_PREFIX.sub("", first.strip())

    while True:
        next_text = WRAP_MARKUP.sub("", stripped).strip()

        if next_text == stripped:
            return next_text

        stripped = next_text


if __name__ == "__main__":
    main()
