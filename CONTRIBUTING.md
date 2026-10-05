# Contributing

## Branches
Do not develop directly on main.

Create a branch from an up-to-date main:
- feature/... for new features
- fix/... for bug fixes
- chore/... for configuration and maintenance

Each branch must have one clear purpose.

## Issues
Before starting work, create an Issue describing the problem or
feature, expected behavior and acceptance criteria.
Assign it to the responsible team member.

## Commits
Use meaningful commit messages, for example:
- Add task listing endpoint
- Add regression test for empty task titles
- Add pull request template

## Pull requests
Open PRs against main in our group's repository.
Use the PR template and reference the related Issue.
Describe the changes and testing results.

## Reviews and merging
Another student must review each PR.
Each student must review at least one PR from a teammate.
Reviews must include a useful technical observation.
Address feedback before merging.

Merge only after:
- At least one teammate approves.
- Required CI checks pass.
- Review discussions are resolved.

After merging, delete the completed branch.

## Tests
For application changes, run npm test.
Do not delete or weaken tests to make CI pass.
