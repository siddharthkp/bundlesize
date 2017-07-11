describe('integration/cli', () => {
  it('works and logs correct output', () => {
    spyOn(console, 'log');

    const parse = require('../../src/parser');
    const createReporter = require('../../src/reporter');
    const createRunner = require('../../src/runner');

    const reporter = createReporter();
    const runner = createRunner(null, null, reporter, parse);

    runner.run([
      {
        maxSize: 50,
        path: 'kittens.js',
        size: 30,
      },
    ])

    expect(console.log.calls.argsFor(0)[1]).toContain('kittens.js: 30B < maxSize 50B gzip');
    expect(console.log.calls.argsFor(1)[1]).toContain('bundle size < maxSize');
  });
});
