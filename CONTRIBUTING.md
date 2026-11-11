# Contributing

Thank you for considering a contribution to this project. Contributions should improve the application, make it easier to maintain, or help other contributors work with the codebase.

## Before you start

1. Check the existing issues and pull requests to avoid duplicating ongoing work.
2. For a substantial change, open an issue or discussion first so the proposed approach can be agreed upon.
3. Read the relevant code before changing it and keep the scope of each pull request focused.
4. Never commit credentials, API keys, access tokens, or real environment files.

## Development setup

This project uses React, TypeScript, Vite, Tailwind CSS, and npm.

Prerequisites:

- Node.js (use a currently supported LTS release)
- npm

Set up the project:

```bash
git clone https://github.com/tech-dev-club/big.git
cd big
npm install
npm run dev
```

Create a feature branch before making changes:

```bash
git checkout -b feat/short-description
```

## Available checks

Run the checks that apply to your change before opening a pull request:

```bash
npm run lint
npm run build
```

If a check fails, include the relevant failure details in the pull request rather than claiming it passed.

## Code and change guidelines

- Use TypeScript types that describe the data being handled. Avoid introducing `any` unless there is a clear reason.
- Follow the existing component, naming, formatting, and folder conventions.
- Prefer small, reusable components over duplicated UI or business logic.
- Keep changes accessible and responsive where they affect the interface.
- Handle loading, empty, and error states when adding data-driven behavior.
- Do not add dependencies unless the change needs them.
- Update documentation when setup, configuration, or user-facing behavior changes.
- Do not include unrelated formatting or refactoring in a focused fix.

## Environment variables and secrets

- Keep local credentials in an untracked environment file.
- Do not commit `.env`, tokens, passwords, service-role keys, or production credentials.
- If a new environment variable is required, document its name and purpose using a safe placeholder. Never include its real value.
- Check the diff for secrets before pushing.

## Pull request process

1. Push your feature branch to your fork or permitted repository branch.
2. Open a pull request targeting the `main` branch.
3. Use a descriptive title, such as `fix: handle empty search results` or `docs: clarify local setup`.
4. Explain the problem, the solution, and any relevant trade-offs.
5. Include screenshots or a short recording for visible UI changes when useful.
6. List the checks you ran and their actual results.
7. Link related issues and note any follow-up work.

A pull request should be focused, reviewable, and ready for feedback. Maintainers may request changes before merging.

## Suggested pull request description

```markdown
## Summary
Describe what changed and why.

## Related issue
Closes #

## Validation
- [ ] npm run lint
- [ ] npm run build
- [ ] Manually checked the affected behavior

## Screenshots
Add screenshots for UI changes, if applicable.
```

Thank you for helping improve the project.
