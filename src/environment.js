let environment;

// Use CircleCi's env variables if detected.
// See https://circleci.com/docs/1.0/environment-variables/ for reference.
if (process.env.CIRCLECI) {
  environment = {
    repo: `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`,
    token: process.env.github_token || process.env.GITHUB_TOKEN,
    // Circle doesn't have the EVENT_TYPE information so we default to 'pull_request'.
    event_type: 'pull_request',
    sha: process.env.CIRCLE_SHA1,
    branch: process.env.CIRCLE_BRANCH
  };
} else if (process.env.DRONE) {
  // Use Drone's env variables if detected.
  // See http://readme.drone.io/usage/environment-reference/ for reference.
  environment = {
    repo: process.env.DRONE_REPO || process.env.CI_REPO,
    token: process.env.github_token || process.env.GITHUB_TOKEN,
    // DRONE_BUILD_EVENT available in drone > v0.5; DRONE_EVENT, CI_EVENT available in drone < v0.5
    event_type: process.env.DRONE_BUILD_EVENT || process.env.DRONE_EVENT || process.env.CI_EVENT,
    sha: process.env.DRONE_COMMIT || process.env.CI_COMMIT,
    branch: process.env.DRONE_BRANCH || process.env.CI_BRANCH,
  };
} else {
  // Default to travis
  // See https://docs.travis-ci.com/user/environment-variables/ for reference.
  environment = {
    repo: process.env.TRAVIS_REPO_SLUG,
    token: process.env.github_token || process.env.GITHUB_TOKEN,
    event_type: process.env.TRAVIS_EVENT_TYPE,
    sha: process.env.TRAVIS_PULL_REQUEST_SHA || process.env.TRAVIS_COMMIT,
    branch: process.env.TRAVIS_EVENT_TYPE === 'push'
      ? process.env.TRAVIS_BRANCH
      : process.env.TRAVIS_PULL_REQUEST_BRANCH
  };
}

module.exports = environment;
