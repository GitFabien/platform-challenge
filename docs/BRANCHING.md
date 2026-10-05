# Branching Strategy

Model: *GitHub Flow* (simplified trunk-based). `main` is always stable and deployable.

| Prefix       | Purpose                                  | Example                         |
|--------------|------------------------------------------|---------------------------------|
| `feature/`   | New functionality                        | `feature/add-task-listing`      |
| `fix/`       | Bug fix                                  | `fix/failing-unit-test`         |
| `chore/`     | CI, Docker, Terraform, docs, config      | `chore/add-node-ci`             |

## Rules
1. No direct commits to `main`.
2. One branch = one issue = one purpose.
3. Every change goes through a Pull Request that references an issue (`Closes #N`).
4. A PR requires 1 approval from another team member and passing CI.
5. Branches are deleted after merge.

## Commit conventions
Use the imperative mood and descriptive messages:
-  `Add regression test for invalid status`


## Workflow
Issue → branch → commits → PR → review → approval → green CI → merge → delete branch