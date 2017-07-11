const Build = require('github-build');
module.exports = ciEnvironment => {
  // Not on CI or no pull_request? Don't send results to github.
  if (!ciEnvironment || ciEnvironment.event_type !== 'pull_request') {
    return {
      start: () => {},
      pass: () => {},
      fail: () => {},
      error: () => {},
    };
  }

  const { repo, sha, token, event_type } = ciEnvironment;
  const label = 'bundlesize';
  const description = 'Checking output size...';
  const meta = { repo, sha, token, label, description };

  const build = new Build(meta);
  return {
    start: build.start,
    pass: message => build.pass(message),
    fail: message => build.fail(message),
    error: message => build.error(message),
  };
};
