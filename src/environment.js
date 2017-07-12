let environment;

// prefer prefix token name and back support github_token
const token =
  process.env.bundlesize_github_token ||
  process.env.BUNDLESIZE_GITHUB_TOKEN ||
  process.env.github_token ||
  process.env.GITHUB_TOKEN;

// Use CircleCi's env variables if detected.
// See https://circleci.com/docs/1.0/environment-variables/ for reference.
if (process.env.CIRCLECI) {
  environment = {
    repo: `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env
      .CIRCLE_PROJECT_REPONAME}`,
    token,
    // Circle doesn't have the EVENT_TYPE information so we default to 'pull_request'.
    event_type: "pull_request",
    sha: process.env.CIRCLE_SHA1,
    branch: process.env.CIRCLE_BRANCH,
  };
} else {
  // Default to travis
  // See https://docs.travis-ci.com/user/environment-variables/ for reference.
  environment = {
    repo: process.env.TRAVIS_REPO_SLUG,
    token,
    event_type: process.env.TRAVIS_EVENT_TYPE,
    sha: process.env.TRAVIS_PULL_REQUEST_SHA || process.env.TRAVIS_COMMIT,
    branch:
      process.env.TRAVIS_EVENT_TYPE === "push"
        ? process.env.TRAVIS_BRANCH
        : process.env.TRAVIS_PULL_REQUEST_BRANCH,
  };
}

module.exports = environment;
