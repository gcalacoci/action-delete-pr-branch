# action-delete-pr-branch

This action given a pr number deletes the pr head branch

## Inputs

### `github_token`

**Required** Necessary token to execute the delete action.

### `number`

The number of the pull request to delete the branch from.

## Example usage

```yaml
- name: Remove PRs head branch
  uses: gcalacoci/action-delete-pr-branch@main
  with:
    github_token: ${{github.token}}
    number: ${{github.event.pull_request.number}}
```
