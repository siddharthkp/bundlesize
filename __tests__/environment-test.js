const createEnv = require('../src/environment');

let getEnv;

describe('environment', () => {
  describe('CircleCi', () => {
    describe('pull request', () => {
      beforeEach(() => {
        getEnv = (name) => {
          const env = {
            'CIRCLECI': 'true',
            'CIRCLE_PROJECT_USERNAME': 'pied-pieper',
            'CIRCLE_PROJECT_REPONAME': 'hotdog-not-hotdog',
            'CIRCLE_PULL_REQUEST': 'noop://github.com/pied-pieper/hotdog-not-hotdog/pull/1/files',
            'CIRCLE_SHA1': 'ffff',
            'CIRCLE_BRANCH': 'pizza-feature',
            'github_token': 'aaaa'
          };
          return env[name];
        }
      });
      it('sets event_type to pull_request', () => {
        expect(createEnv(getEnv).event_type).toEqual('pull_request');
      });
      it('parses environment correctly', () => {
        expect(createEnv(getEnv)).toMatchSnapshot();
      });
    });
    describe('push', () => {
      beforeEach(() => {
        getEnv = (name) => {
          const env = {
            'CIRCLECI': 'true',
            'CIRCLE_PROJECT_USERNAME': 'pied-pieper',
            'CIRCLE_PROJECT_REPONAME': 'hotdog-not-hotdog',
            'CIRCLE_SHA1': 'ffff',
            'CIRCLE_BRANCH': 'pizza-feature',
            'github_token': 'aaaa'
          };
          return env[name];
        }
      });
      it('sets event_type to push', () => {
        expect(createEnv(getEnv).event_type).toEqual('push');
      });
    });
  });

  describe('TravisCi', () => {
    describe('pull request', () => {
      beforeEach(() => {
        getEnv = (name) => {
          const env = {
            'TRAVIS': 'true',
            'TRAVIS_REPO_SLUG': 'pied-pieper/hotdog-not-hotdog',
            'TRAVIS_EVENT_TYPE': 'pull_request',
            'TRAVIS_PULL_REQUEST_SHA': 'ffff',
            'TRAVIS_PULL_REQUEST_BRANCH': 'pizza-feature',
            'github_token': 'aaaa'
          };
          return env[name];
        }
      });
      it('sets event_type to pull_request', () => {
        expect(createEnv(getEnv).event_type).toEqual('pull_request');
      });
      it('parses environment correctly', () => {
        expect(createEnv(getEnv)).toMatchSnapshot();
      });
    });
    describe('push', () => {
      beforeEach(() => {
        getEnv = (name) => {
          const env = {
            'TRAVIS': 'true',
            'TRAVIS_REPO_SLUG': 'pied-pieper/hotdog-not-hotdog',
            'TRAVIS_EVENT_TYPE': 'push',
            'TRAVIS_COMMIT': 'ffff',
            'TRAVIS_BRANCH': 'pizza-feature',
            'GITHUB_TOKEN': 'aaaa'
          };
          return env[name];
        }
      });
      it('sets event_type to push', () => {
        expect(createEnv(getEnv).event_type).toEqual('push');
      });
      it('parses environment correctly', () => {
        expect(createEnv(getEnv)).toMatchSnapshot();
      });
    });
  });

  describe('No CI', () => {
    beforeEach(() => {
      getEnv = (name) => undefined;
    });
    it('resolves to null', () => {
      expect(createEnv(getEnv)).toBe(null);
    });
  });
});
