const core = require('@actions/core')
const github = require('@actions/github')

async function main() {

    try {
        const token = core.getInput("github_token", { required: true })
        const number = core.getInput("numbers")

        const client = github.getOctokit(token)

        const prPull = await client.rest.pulls.get({
            ...github.context.repo,
            pull_number: number
        })
        console.log(prPull)
        let repoOwner = github.context.repo.owner
        let repo = github.context.repo.repo

        console.log(`Removing ${repoOwner}/${repo}/${prPull.data.head.ref}`)

        await client.rest.git.deleteRef({
            owner: repoOwner,
            repo: repo,
            ref: `heads/${prPull.data.head.ref}`
        })

    } catch (error) {
        core.setFailed(error.message);
    }
}

main()