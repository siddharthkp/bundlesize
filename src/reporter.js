const { error, warn, info } = require('prettycli');

module.exports = build => {
  return {
    reportStart: () => {
      build.start();
    },

    reportError: err => {
      build.fail();
      error(err, { fail: true, label: 'FATAL' });
    },

    reportResult: report => {
      if (report.status === 'fail') {
        error(report.message, { fail: false, label: 'FAIL' });
        build.fail(report.message);
      } else if (report.status === 'warn') {
        warn(report.message);
        build.pass(report.message);
      } else {
        info('PASS', report.message);
        build.pass(report.message);
      }
    },
  };
};
