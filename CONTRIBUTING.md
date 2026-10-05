# Contributing

## Branching strategy
`main` is protected and always working. All changes reach it through a reviewed pull request.

| Prefix     | Purpose                     | Example                  |
|------------|-----------------------------|--------------------------|
| `feature/` | New functionality           | `feature/9-list-tasks`   |
| `fix/`     | Bug fixes                   | `fix/1-failing-test`     |
| `chore/`   | CI, Docker, Terraform, docs | `chore/14-docker-ci`          |

- Branch from an up-to-date `main` and put the issue number in the branch name.
- One branch = one issue = one purpose.
- Merge into `main` only through a PR with 1 approval and passing CI.
- Branches are deleted after merge.

## Workflow
1. Create an issue using a template.
2. `git checkout main && git pull`
3. `git checkout -b feature/<issue>-<short-name>`
4. Commit, push, and open a PR that references the issue.
5. A teammate reviews. Address the feedback, then merge.

## Commit messages
Use the imperative mood and say what the commit does.
- Good: `Add task status validation`, `Add regression test for invalid status`
- Bad: `update`, `fix`, `final`
