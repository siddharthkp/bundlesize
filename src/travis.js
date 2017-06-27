const travis = {
  repo: process.env.TRAVIS_REPO_SLUG,
  token: process.env.github_token,
  event_type: process.env.TRAVIS_EVENT_TYPE,
  sha: process.env.TRAVIS_PULL_REQUEST_SHA || process.env.TRAVIS_COMMIT,
  branch: process.env.TRAVIS_EVENT_TYPE === 'push'
    ? process.env.TRAVIS_BRANCH
    : process.env.TRAVIS_PULL_REQUEST_BRANCH
}

module.exports = travis
