# Clean Code inventory

Source: Robert C. Martin, _Clean Code_. Stack: **typescript** (Expo SDK 58 / React Native).

Lint entrypoint: `npm run lint` (`eslint .`). Typecheck: `npm run typecheck`. Combined gate: `npm run check` (lint + typecheck + tests + knip + jscpd; husky pre-commit). Do not use `npx expo lint` as the gate — it only covers `app/`, `src/`, and `components/`.

## Tags

| Tag                   | Meaning                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `automate`            | Machine gate in ESLint / Prettier / CI                           |
| `guide`               | Cursor / human judgment in `.cursor/rules/`                      |
| `exception-candidate` | Document here with principle + rationale before weakening a gate |

## Enforcement pattern

| Layer                  | Location                                          | Role                                                  |
| ---------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Automated gates        | `eslint.config.js` + Prettier + knip + jscpd, via `npm run check` | Chapter `automate` rows               |
| Agent / human judgment | `.cursor/rules/clean-code.mdc`                    | Meaningful Names through Smells                       |
| Unit-test judgment     | `.cursor/rules/unit-tests.mdc`                    | FIRST / AAA / dual standard (`*.spec.*` / `*.test.*`) |
| Agent entrypoint       | `AGENTS.md`                                       | Pointer to this inventory only                        |
| Source of truth        | this file                                         | Principle → tag → check                               |

## Cursor rules convention

- Default: one `.cursor/rules/clean-code.mdc` for judgment (`alwaysApply: true`)
- Split only for different globs or a real boundary seam — currently `unit-tests.mdc` for test files
- Guide-heavy chapters (1, 6, 12, 14, much of 13) stay in the rule file — no extra ESLint plugin for those alone

## Stack-specific plugins / tools

Prefer MIT/Apache tooling. Do **not** enable `eslint-plugin-sonarjs` (LGPL).

| Intent               | Tool in this repo                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Base lint            | `eslint-config-expo/flat` (SDK 58 Flat config)                                                                                                   |
| Names (Ch.2)         | `@typescript-eslint/naming-convention`, `id-length`, `id-denylist`                                                                               |
| Functions (Ch.3)     | `complexity` 5, `max-depth` 2, `max-params` 3, `max-lines-per-function` 20                                                                       |
| Comments (Ch.4)      | `no-warning-comments` — ban `fixme` / `xxx` / `hack`; `TODO` allowed                                                                             |
| Formatting (Ch.5)    | Prettier + `eslint-plugin-prettier` / `eslint-config-prettier`; `padding-line-between-statements` for if/for/return and after declaration groups |
| Errors (Ch.7)        | `no-empty`, `no-throw-literal`, `prefer-promise-reject-errors`, typed `@typescript-eslint/only-throw-error`                                      |
| Boundaries (Ch.8/11) | VIPER layer map above; `no-restricted-imports` in `eslint.config.js`                                                                             |
| Unit tests (Ch.9)    | `jest-expo` + Jest 30 (`npm test` / `npm run test:coverage`); `eslint-plugin-jest`; dual-standard size offs on specs/harness                     |
| Classes (Ch.10)      | `max-classes-per-file` 1, `max-lines` 100                                                                                                        |
| Concurrency (Ch.13)  | `@typescript-eslint/await-thenable`, `@typescript-eslint/require-await` (type-aware `projectService`)                                            |
| Smells (Ch.17)       | `eslint-plugin-unicorn@65` (MIT, last ESLint 9-compatible; Expo pins ESLint 9), `jscpd`, `knip`                                                  |

### VIPER + Clean Architecture layer map (React-adapted)

| Role                     | Location                                         | Imports                                                                                                    |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Builder                  | `app/`                                           | `modules/features`, `modules/shared`, `data/sample` / `data/pandascore`, `lib/`, `constants/`, `expo-router` |
| Router                   | `modules/features/*/router.ts`                   | `expo-router`, contracts, entities — no `react-native` / `data/` / sibling features                         |
| View                     | `modules/features/*/view.tsx` (+ `components/`)  | presenter types, `constants/`, `modules/shared` — no `expo-router`, no data queries, no sibling features |
| Presenter                | `modules/features/*/presenter.ts`                | use cases, shared entities/gateways, contracts, feature `router`, `lib/use-now`, `lib/use-schedule-board`, `lib/format-time` / `device-time-zone` — no `react-native` / `expo-router` / `data/` / sibling features |
| Use cases                | `modules/features/*/use-cases/`, `modules/shared/use-cases/` | entities (and other use cases) — never `data/` or sibling features                                |
| Gateways                 | `modules/shared/gateways.ts`                     | entity types — ports implemented in `data/`                                                                |
| Entities                 | `modules/shared/entities.ts`                     | domain DTOs only                                                                                           |
| Shared UI                | `modules/shared/components/`                     | widgets used by more than one feature                                                                      |
| Sample / API             | `data/sample/`, `data/pandascore/`               | `entities` + `gateways` only                                                                               |
| Clock / board            | `lib/use-now.ts`, `lib/format-time.ts`, `lib/schedule-board.ts`, `lib/sample-board.ts`, `lib/use-schedule-board.ts` | infrastructure; format-time free of modules; Builders pass `sampleBoard` into presenters |

Feature modules own `view`, `presenter`, `router`, `contracts`, harness, and feature use cases. Types, gateways, and use cases imported by more than one feature live in `modules/shared`. Enforced with `no-restricted-imports` in `eslint.config.js` (Ch.8 / Ch.11). Expo Router treats every file in `app/` as a route, so composition hooks stay in `lib/` and Builders pass `sampleBoard` into presenters.

### Exception-candidates (not accepted)

These are noisy on React Native screens; keep the default gates until an intentional exception is written below.

| Candidate                                            | Principle    | Why it might be allowed                                              |
| ---------------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| Screen / card files over `max-lines-per-function` 20 | Ch.3 / Ch.10 | JSX + colocated `StyleSheet.create` inflate function and file length |

## Chapter matrix

| Ch    | Topic                       | Key principles                                                      | Tags                | Planned checks                                                                                                                                 |
| ----- | --------------------------- | ------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Clean Code                  | Craft; what clean means here                                        | `guide`             | Judgment in `clean-code.mdc`; closeout by humans                                                                                               |
| 2     | Meaningful Names            | Intention-revealing; searchable; one word per concept; no encodings | `automate`, `guide` | `naming-convention`, `id-length` min 2, denylist `l`/`O`/`I`/`cb`/`err`                                                                        |
| 3     | Functions                   | Small; one abstraction level; few args; CQS; no flag args           | `automate`, `guide` | `complexity` 5, `max-depth` 2, `max-params` 3, `max-lines-per-function` 20 (skip blank/comments)                                               |
| 4     | Comments                    | Why not what; prefer rename/extract; no FIXME/XXX/HACK              | `automate`, `guide` | `no-warning-comments` for fixme/xxx/hack                                                                                                       |
| 5     | Formatting                  | Newspaper; vertical openness/density; team formatter                | `automate`, `guide` | Prettier (`.prettierrc`); `padding-line-between-statements` (blank around if/for, before return, after declaration groups); no style-lint wars |
| 6     | Objects and Data Structures | Data vs object; LoD; DTOs; no Active Record on payloads             | `guide`             | `Match` / `Team` / `Game` stay data in `modules/shared`; behavior in feature / shared use cases and Presenters                                 |
| 7     | Error Handling              | Exceptions over codes; no empty catch; context in errors            | `automate`, `guide` | `no-empty`, `no-throw-literal`, `prefer-promise-reject-errors`, `only-throw-error`                                                             |
| 8     | Boundaries                  | Wrap third-party; owned façade; learning tests at the edge          | `automate`, `guide` | Live schedule API behind `data/` implementing gateways; Expo Router adapters in feature `router.ts`; `no-restricted-imports`                    |
| 9     | Unit Tests                  | FIRST; AAA; one concept; readable DSL / harness                     | `automate`, `guide` | `unit-tests.mdc`; Jest plugin + dual-standard offs; `npm test` / `npm run test:coverage` via `jest-expo`                                       |
| 10    | Classes                     | SRP; small cohesive types                                           | `automate`, `guide` | `max-classes-per-file` 1, `max-lines` 100 (skip blank/comments)                                                                                |
| 11    | Systems                     | Construction vs use; one-way dependencies                           | `automate`, `guide` | Builders in `app/` inject `sampleBoard` into presenters; `no-restricted-imports` enforces the layer map above                                    |
| 12    | Emergence                   | Runs tests; no duplication; expresses intent; fewest elements       | `automate`, `guide` | `npm run check` includes knip + jscpd (threshold 0)                                                                                            |
| 13    | Concurrency                 | Clear async boundaries; no false thread myths                       | `automate`, `guide` | `await-thenable`, `require-await`; RN JS thread + Reanimated worklets stay guide                                                               |
| 14    | Successive Refinement       | Draft → refine → green → commit; no broken main                     | `guide`             | Feature branch; commit when asked; CI/hooks only if already present                                                                            |
| 15–16 | Case studies                | —                                                                   | out of scope        | Fold heuristics into Ch.17                                                                                                                     |
| 17    | Smells and Heuristics       | G5 duplication; dead code; nesting; negated conditions              | `automate`, `guide` | unicorn: `no-nested-ternary`, `no-lonely-if`, `prefer-array-find`; `jscpd .` (threshold 0); `knip`                                              |

## Intentional exceptions

| Ch  | Exception                             | Principle                               | Rationale                                                                                          |
| --- | ------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 2   | `unstable_settings` may be snake_case | Intention-revealing names; no encodings | Expo Router requires this exact export; see https://docs.expo.dev/router/advanced/router-settings/ |
| 2   | PandaScore vendor DTO properties may be snake_case | Intention-revealing names; no encodings | Vendor JSON field names are owned by PandaScore; mapped to camelCase entities in `data/pandascore`. Lint override is `data/pandascore/vendor-types.ts` only. |

Add a row before disabling or relaxing a gate. Empty means the defaults above apply.
