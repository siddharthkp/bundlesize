module.exports = getEnv => {
  if (!getEnv) {
    getEnv = variable => process.env[variable];
  }

  const token = getEnv('github_token') || getEnv('GITHUB_TOKEN');

  // See https://circleci.com/docs/1.0/environment-variables/
  if (
    getEnv('CIRCLECI') && token
  ) {
    return {
      repo: `${getEnv('CIRCLE_PROJECT_USERNAME')}/${getEnv(
        'CIRCLE_PROJECT_REPONAME'
      )}`,
      token: token,
      event_type: getEnv('CIRCLE_PULL_REQUEST') ? 'pull_request' : 'push',
      sha: getEnv('CIRCLE_SHA1'),
      branch: getEnv('CIRCLE_BRANCH'),
    };
  } else if (getEnv('TRAVIS') && token) {
    // See https://docs.travis-ci.com/user/environment-variables/.
    return {
      repo: getEnv('TRAVIS_REPO_SLUG'),
      token: token,
      event_type: getEnv('TRAVIS_EVENT_TYPE'),
      sha: getEnv('TRAVIS_PULL_REQUEST_SHA') || getEnv('TRAVIS_COMMIT'),
      branch:
        getEnv('TRAVIS_EVENT_TYPE') === 'push'
          ? getEnv('TRAVIS_BRANCH')
          : getEnv('TRAVIS_PULL_REQUEST_BRANCH'),
    };
  }
  return null;
};
