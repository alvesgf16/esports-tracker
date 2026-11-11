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
PLACEHOLDERS = frozenset({"todo", "tbd"})
COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)
EMPTY_BOX = re.compile(r"^[ \t]*[-*][ \t]+\[[ xX]\][ \t]*$", re.MULTILINE)
HEADING = re.compile(r"^##\s+(.+?)\s*$")
FOOTER = re.compile(r"^made with\s+\[?cursor", re.IGNORECASE)


def main() -> None:
    issues = check_description(load_pr_body())

    if issues:
        print("\n".join(issues), file=sys.stderr)
        raise SystemExit(1)


def load_pr_body() -> str:
    with open(os.environ["GITHUB_EVENT_PATH"], encoding="utf-8") as handle:
        event = json_object(json.load(handle))

    if event is None:
        return ""

    payload = json_object(event.get("pull_request"))

    if payload is None:
        return ""

    body = payload.get("body")

    return body if isinstance(body, str) else ""


def json_object(value: object) -> dict[str, object] | None:
    return (
        cast(dict[str, object], value) if isinstance(value, dict) else None
    )


def check_description(body: str) -> list[str]:
    sections = parse_sections(without_fenced_blocks(COMMENT.sub("", body)))
    issues: list[str] = []

    for heading in HEADINGS:
        if heading not in sections:
            issues.append(f"Missing ## {heading} section.")
            continue

        text = section_text(heading, sections[heading])

        if not text:
            issues.append(f"## {heading} needs more than a placeholder.")

    return issues


def without_fenced_blocks(body: str) -> str:
    lines: list[str] = []
    in_fence = False

    for line in body.splitlines():
        if is_fence_line(line):
            in_fence = not in_fence
            continue

        if not in_fence:
            lines.append(line)

    return "\n".join(lines)


def is_fence_line(line: str) -> bool:
    stripped = line.lstrip()

    return stripped.startswith(("```", "~~~"))


def parse_sections(body: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {}
    current = None

    for line in body.splitlines():
        match = HEADING.match(line)

        if match:
            current = match.group(1)
            sections.setdefault(current, [])
            continue

        if current is not None:
            sections[current].append(line)

    return sections


def section_text(heading: str, lines: list[str]) -> str:
    text = EMPTY_BOX.sub("", "\n".join(lines)).strip()

    if heading == "Risks":
        text = without_footer_lines(text)

    return "" if is_placeholder(heading, text) else text


def without_footer_lines(text: str) -> str:
    kept = [
        line for line in text.splitlines() if not FOOTER.match(line.strip())
    ]

    return "\n".join(kept).strip()


def is_placeholder(heading: str, text: str) -> bool:
    lowered = text.lower()

    if lowered in PLACEHOLDERS:
        return True

    if lowered in {"n/a", "none"}:
        return lowered not in OPTIONAL_EMPTY.get(heading, frozenset())

    return False


if __name__ == "__main__":
    main()
