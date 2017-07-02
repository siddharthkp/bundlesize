jest.mock('axios');
jest.mock('github-build');

const axios = require('axios');
const Build = require('github-build');

let ciEnv, filesInput;

const run = (ci, files) => {
  const createBuild = require('../../src/build');
  const parse = require('../../src/parser');
  const createReporter = require('../../src/reporter');
  const createRunner = require('../../src/runner');
  const createApi = require('../../src/api');

  const build = createBuild(ci);
  const reporter = createReporter(build);
  const api = createApi(ci);
  const runner = createRunner(ci, api, reporter, parse);

  runner.run(files);
};

describe('integration/ci', () => {
  describe('with working config and small size', () => {
    beforeEach(() => {
      ciEnv = {
        branch: 'pizza-feature',
        event_type: 'pull_request',
        repo: 'pied-pieper/hotdog-not-hotdog',
        sha: 'ffff',
        token: 'aaaa',
      };

      filesInput = [
        {
          threshold: 50,
          path: 'kittens.js',
          size: 30,
        },
      ];
    });
    it('logs output to console', done => {
      spyOn(console, 'log');
      run(ciEnv, filesInput);
      // Hack to catch Promise.resolve in mocks.
      setTimeout(() => {
        // Expect proper console output
        expect(console.log.calls.count()).toEqual(2);
        expect(console.log.calls.argsFor(0)[1]).toContain(
          'kittens.js: 30B < threshold 50B gzip'
        );
        expect(console.log.calls.argsFor(1)[1]).toContain(
          'bundle size < threshold'
        );
        done();
      }, 1);
    });
    it('calls api for master values', done => {
      spyOn(console, 'log'); // Only to suppress
      run(ciEnv, filesInput);
      // Hack to catch Promise.resolve in mocks.
      setTimeout(() => {
        expect(axios.get).toHaveBeenCalledWith(
          'https://bundlesize-store-iothfynuyu.now.sh/values?repo=pied-pieper/hotdog-not-hotdog&token=aaaa'
        );
        done();
      }, 1);
    });
    it('sets github status', done => {
      spyOn(console, 'log');
      run(ciEnv, filesInput);
      // Hack to catch Promise.resolve in mocks.
      setTimeout(() => {
        expect(Build.prototype.start).toHaveBeenCalled();
        expect(Build.prototype.pass).toHaveBeenCalledWith(
          'bundle size < threshold'
        );
        done();
      }, 1);
    });
    it('handles failing API gracefully', done => {
      spyOn(console, 'log');
      spyOn(process, 'exit');
      axios.get = jest.fn(() => Promise.reject('422 Invalid Token!'));
      run(ciEnv, filesInput);
      // Hack to catch Promise.resolve in mocks.
      setTimeout(() => {
        expect(console.log.calls.count()).toEqual(1);
        expect(console.log.calls.argsFor(0)[1]).toContain('422 Invalid Token');
        expect(process.exit).toHaveBeenCalledWith(1);
        // Reset
        axios.get = jest.fn(() => Promise.resolve({ data: [] }));
        done();
      }, 1);
    });
  });

  describe('with master push config and small size', () => {
    beforeEach(() => {
      ciEnv = {
        branch: 'master',
        event_type: 'push',
        repo: 'pied-pieper/hotdog-not-hotdog',
        sha: 'ffff',
        token: 'aaaa',
      };

      filesInput = [
        {
          threshold: 50,
          path: 'kittens.js',
          size: 30,
        },
      ];
    });
    it('calls api to set master values', done => {
      spyOn(console, 'log'); // Only to suppress
      run(ciEnv, filesInput);
      // Hack to catch Promise.resolve in mocks.
      setTimeout(() => {
        expect(
          axios.post
        ).toHaveBeenCalledWith(
          'https://bundlesize-store-iothfynuyu.now.sh/values',
          {
            repo: 'pied-pieper/hotdog-not-hotdog',
            sha: 'ffff',
            token: 'aaaa',
            values: [
              {
                master: undefined,
                message: 'kittens.js: 30B < threshold 50B gzip',
                path: 'kittens.js',
                size: 30,
                status: 'pass',
                threshold: 50,
              },
            ],
          }
        );
        done();
      }, 1);
    });
  });
});
