This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npm run lint                # lint (eslint . — whole project, not expo lint)
npm run typecheck           # tsc --noEmit
npm test                    # unit tests (jest-expo)
npm run check               # lint + typecheck + tests + knip + jscpd (also runs on git pre-commit via husky)
npm run commitlint          # lint a commit message from stdin (also runs on git commit-msg via husky)
npm run test:coverage       # unit tests with coverage report in coverage/
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run `npm run check` before declaring any task done. Commits are blocked unless it passes.

Commit messages follow Conventional Commits. Husky runs commitlint on `commit-msg`. Example: `feat: add expo hosting so the schedule can run as a phone web app`.

Pull request descriptions follow `.github/PULL_REQUEST_TEMPLATE.md`. GitHub requires that reserved filename (not kebab-case). The `pr-description` workflow fetches the live PR body with `actions/github-script`, then runs `.github/scripts/require-pr-description.py` with `GITHUB_TOKEN` cleared so the PR-controlled checker cannot use the token. Like other `pull_request` workflows, the job uses the PR’s workflow and script; it does not pin those files to `main`. The checker rejects missing sections, empty sections, and `TODO` / `TBD` at the start of a section (including after a list marker or wrapping markup). Visuals may be `N/A`; Risks may be `None`. Generic filler such as `Add details here` is out of scope.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `app/` — every file there is a screen / Builder, `_layout.tsx` files define navigators.
- Feature logic uses React-adapted **VIPER** under `modules/features/` (View / Presenter / Router contracts) with Clean Architecture use cases. Feature and shared modules share the same layout (`components/`, `mappers/`, `use-cases/`, contracts, entities, gateways, presenter, router, view, harness, tests). Cross-feature entities, gateways, use cases, and UI live in `modules/shared/`. `app/` wires features: Builders pass `scheduleSource()` into `useScheduleSnapshot`, then inject the loaded board and clock into presenters; keep Presenters, Routers, and use cases outside `app/`. Every file in `app/` is a route (Expo Router SDK 58), so composition hooks stay in `lib/`.
- Import `Link` from `expo-router` only in `app/`. `useRouter` and `useLocalSearchParams` belong in `modules/features/*/router.ts`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Clean Code

- Inventory: [docs/clean-code-inventory.md](docs/clean-code-inventory.md)
- Judgment: [`.cursor/rules/clean-code.mdc`](.cursor/rules/clean-code.mdc)
