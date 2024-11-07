const core = require('@actions/core')
const github = require('@actions/github')

try {
    const token = core.getInput("github_token", { required: true })
    const number = core.getInput("numbers")

    const client = github.getOctokit(token)
    const prPull = await client.pulls.get({
        ...github.context.repo,
        pull_number: number
    })
    let repoOwner = github.context.repo.owner
    let repo = github.context.repo.repo

    console.log(`Removing ${repoOwner}/${repo}/${prPull.data.head.ref}`)

    await client.git.deleteRef({
        owner: repoOwner,
        repo: repo,
        ref: `heads/${prPull.data.head.ref}`
    })

} catch (error) {
    core.setFailed(error.message);
}
