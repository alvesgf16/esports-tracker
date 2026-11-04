# Clean Code inventory

Source: Robert C. Martin, _Clean Code_. Stack: **typescript** (Expo SDK 58 / React Native).

Lint entrypoint: `npx expo lint` (`package.json` script `lint`). Typecheck: `npx tsc --noEmit`. Dead code: `npm run knip`. Duplication: `npm run jscpd`.

## Tags

| Tag | Meaning |
| --- | --- |
| `automate` | Machine gate in ESLint / Prettier / CI |
| `guide` | Cursor / human judgment in `.cursor/rules/` |
| `exception-candidate` | Document here with principle + rationale before weakening a gate |

## Enforcement pattern

| Layer | Location | Role |
| --- | --- | --- |
| Automated gates | `eslint.config.js` + Prettier, via `npx expo lint` | Chapter `automate` rows |
| Agent / human judgment | `.cursor/rules/clean-code.mdc` | Meaningful Names through Smells |
| Unit-test judgment | `.cursor/rules/unit-tests.mdc` | FIRST / AAA / dual standard (`*.spec.*` / `*.test.*`) |
| Agent entrypoint | `AGENTS.md` | Pointer to this inventory only |
| Source of truth | this file | Principle → tag → check |

## Cursor rules convention

- Default: one `.cursor/rules/clean-code.mdc` for judgment (`alwaysApply: true`)
- Split only for different globs or a real boundary seam — currently `unit-tests.mdc` for test files
- Guide-heavy chapters (1, 6, 12, 14, much of 13) stay in the rule file — no extra ESLint plugin for those alone

## Stack-specific plugins / tools

Prefer MIT/Apache tooling. Do **not** enable `eslint-plugin-sonarjs` (LGPL).

| Intent | Tool in this repo |
| --- | --- |
| Base lint | `eslint-config-expo/flat` (SDK 58 Flat config) |
| Names (Ch.2) | `@typescript-eslint/naming-convention`, `id-length`, `id-denylist` |
| Functions (Ch.3) | `complexity` 5, `max-depth` 2, `max-params` 3, `max-lines-per-function` 20 |
| Comments (Ch.4) | `no-warning-comments` — ban `fixme` / `xxx` / `hack`; `TODO` allowed |
| Formatting (Ch.5) | Prettier + `eslint-plugin-prettier` / `eslint-config-prettier` |
| Errors (Ch.7) | `no-empty`, `no-throw-literal`, `prefer-promise-reject-errors`, typed `@typescript-eslint/only-throw-error` |
| Boundaries (Ch.8/11) | VIPER layer map above; `no-restricted-imports` in `eslint.config.js` |
| Unit tests (Ch.9) | `jest-expo` + Jest when tests are added; `eslint-plugin-jest`; dual-standard size offs on specs |
| Classes (Ch.10) | `max-classes-per-file` 1, `max-lines` 100 |
| Concurrency (Ch.13) | `@typescript-eslint/await-thenable`, `@typescript-eslint/require-await` (type-aware `projectService`) |
| Smells (Ch.17) | `eslint-plugin-unicorn@65` (MIT, last ESLint 9-compatible; Expo pins ESLint 9), `jscpd`, `knip` |

### VIPER layer map (React-adapted)

| Role | Location | Imports |
| --- | --- | --- |
| Builder / Router adapter | `app/` | `modules/`, `lib/use-now`, `constants/`, `expo-router` |
| View | `modules/*/view.tsx` (+ `components/`) | view-model types, `constants/` — no `expo-router`, no data queries |
| Presenter | `modules/*/presenter.ts` | Interactor, Entity types, Router contract — no `react-native` / `expo-router` |
| Interactor | `modules/*/interactor.ts` (+ `helpers/`) | `data/` (Games may call Schedule Interactor) |
| Entity | `data/` | no `app/`, `modules/`, UI |
| Clock | `lib/use-now.ts` | infrastructure used by Builders |

Enforced with `no-restricted-imports` in `eslint.config.js` (Ch.8 / Ch.11).

### Exception-candidates (not accepted)

These are noisy on React Native screens; keep the default gates until an intentional exception is written below.

| Candidate | Principle | Why it might be allowed |
| --- | --- | --- |
| Screen / card files over `max-lines-per-function` 20 | Ch.3 / Ch.10 | JSX + colocated `StyleSheet.create` inflate function and file length |

## Chapter matrix

| Ch | Topic | Key principles | Tags | Planned checks |
| --- | --- | --- | --- | --- |
| 1 | Clean Code | Craft; what clean means here | `guide` | Judgment in `clean-code.mdc`; closeout by humans |
| 2 | Meaningful Names | Intention-revealing; searchable; one word per concept; no encodings | `automate`, `guide` | `naming-convention`, `id-length` min 2, denylist `l`/`O`/`I`/`cb`/`err` |
| 3 | Functions | Small; one abstraction level; few args; CQS; no flag args | `automate`, `guide` | `complexity` 5, `max-depth` 2, `max-params` 3, `max-lines-per-function` 20 (skip blank/comments) |
| 4 | Comments | Why not what; prefer rename/extract; no FIXME/XXX/HACK | `automate`, `guide` | `no-warning-comments` for fixme/xxx/hack |
| 5 | Formatting | Newspaper; vertical openness/density; team formatter | `automate`, `guide` | Prettier (`.prettierrc`); no style-lint wars |
| 6 | Objects and Data Structures | Data vs object; LoD; DTOs; no Active Record on payloads | `guide` | `Match` / `Team` / `Game` stay data; behavior in Schedule Interactor / Presenter |
| 7 | Error Handling | Exceptions over codes; no empty catch; context in errors | `automate`, `guide` | `no-empty`, `no-throw-literal`, `prefer-promise-reject-errors`, `only-throw-error` |
| 8 | Boundaries | Wrap third-party; owned façade; learning tests at the edge | `automate`, `guide` | Live schedule API behind `data/` + Schedule Interactor; Expo Router adapters in `app/`; `no-restricted-imports` |
| 9 | Unit Tests | FIRST; AAA; one concept; readable DSL / harness | `automate`, `guide` | `unit-tests.mdc`; Jest plugin + dual-standard offs; `jest-expo` not installed yet |
| 10 | Classes | SRP; small cohesive types | `automate`, `guide` | `max-classes-per-file` 1, `max-lines` 100 (skip blank/comments) |
| 11 | Systems | Construction vs use; one-way dependencies | `automate`, `guide` | Builders in `app/` wire VIPER; `no-restricted-imports` enforces the layer map above |
| 12 | Emergence | Runs tests; no duplication; expresses intent; fewest elements | `guide` | Duplication/dead-code tools under Ch.17 |
| 13 | Concurrency | Clear async boundaries; no false thread myths | `automate`, `guide` | `await-thenable`, `require-await`; RN JS thread + Reanimated worklets stay guide |
| 14 | Successive Refinement | Draft → refine → green → commit; no broken main | `guide` | Feature branch; commit when asked; CI/hooks only if already present |
| 15–16 | Case studies | — | out of scope | Fold heuristics into Ch.17 |
| 17 | Smells and Heuristics | G5 duplication; dead code; nesting; negated conditions | `automate`, `guide` | unicorn: `no-nested-ternary`, `no-lonely-if`, `prefer-array-find`; `jscpd .`; `knip` |

## Intentional exceptions

| Ch | Exception | Principle | Rationale |
| --- | --- | --- | --- |
| 2 | `unstable_settings` may be snake_case | Intention-revealing names; no encodings | Expo Router requires this exact export; see https://docs.expo.dev/router/advanced/router-settings/ |

Add a row before disabling or relaxing a gate. Empty means the defaults above apply.
