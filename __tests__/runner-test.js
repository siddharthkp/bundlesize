const createRunner = require('../src/runner');

const spies = {
  reporter: {
    reportStart: () => {},
    reportResult: () => {},
    reportFatal: () => {},
  },
  api: {
    get: () => {},
    set: () => {},
  },
  other: {
    parse: () => ({
      files: [],
      status: 'pass',
    }),
  },
};

let runner;
let buildRunner;

describe('runner', () => {
  describe('on cli', () => {
    beforeEach(() => {
      runner = createRunner(null, null, spies.reporter, spies.other.parse);
    });
    it('reports the start', () => {
      spyOn(spies.reporter, 'reportStart');
      runner.run([]);
      expect(spies.reporter.reportStart).toHaveBeenCalled();
    });
    it('sends parse result to reporter', () => {
      spyOn(spies.reporter, 'reportResult');
      runner.run([]);
      expect(spies.reporter.reportResult).toHaveBeenCalledWith({
        files: [],
        status: 'pass',
      });
    });
  });

  describe('on CI pull request', () => {
    beforeEach(() => {
      buildRunner = (event_type = 'pull_request', branch = 'feature-1') => {
        const ciEnv = {
          event_type: event_type,
          branch: branch,
        };
        return createRunner(
          ciEnv,
          spies.api,
          spies.reporter,
          spies.other.parse
        );
      };
    });
    it('fetches master size values', () => {
      spyOn(spies.api, 'get').and.returnValue(Promise.resolve({}));
      buildRunner().run([]);
      expect(spies.api.get).toHaveBeenCalled();
    });
    it('passes fetched master size values to parser, reports result', done => {
      const masterValues = { '/kittens.js': 20 };
      spyOn(spies.other, 'parse').and.returnValue({});
      spyOn(spies.api, 'get').and.returnValue(Promise.resolve(masterValues));
      spyOn(spies.reporter, 'reportResult').and.callFake(() => {
        expect(spies.other.parse).toHaveBeenCalledWith([], masterValues);
        expect(spies.reporter.reportResult).toHaveBeenCalled();
        done();
      });
      buildRunner().run([]);
    });
    describe('on master branch push', () => {
      it('stores passed result', done => {
        spyOn(spies.other, 'parse').and.returnValue({
          files: [],
          status: 'pass',
        });
        spyOn(spies.api, 'get').and.returnValue(Promise.resolve({}));
        spyOn(spies.api, 'set').and.callFake(() => {
          expect(spies.api.set).toHaveBeenCalledWith([]);
          done();
        });
        buildRunner('push', 'master').run([]);
      });
      it('stores warning result', done => {
        spyOn(spies.other, 'parse').and.returnValue({
          files: [],
          status: 'warn',
        });
        spyOn(spies.api, 'get').and.returnValue(Promise.resolve({}));
        spyOn(spies.api, 'set').and.callFake(() => {
          expect(spies.api.set).toHaveBeenCalledWith([]);
          done();
        });
        buildRunner('push', 'master').run([]);
      });
    });
    describe('with failing api', () => {
      it('reports fatal error', (done) => {
        spyOn(spies.api, 'get').and.returnValue(Promise.reject('401'));
        spyOn(spies.reporter, 'reportFatal').and.callFake(() => {
          expect(spies.reporter.reportFatal).toHaveBeenCalledWith('401');
          done();
        });
        buildRunner().run([]);
      });
    });
  });
});
