const { error, warn, info } = require('prettycli');

module.exports = build => {
  return {
    reportStart: () => {
      build && build.start();
    },

    reportFatal: err => {
      build && build.fail();
      error(err, { fail: true, label: 'FATAL' });
      process.exit(1);
    },

    reportResult: report => {
      // Print per-file report
      report.files.forEach(file => {
        switch (file.status) {
          case 'pass':
            info('PASS', file.message);
            break;
          case 'warn':
            warn(file.message);
            break;
          case 'fail':
            error(file.message, { fail: false, label: 'FAIL' });
            break;
          default:
            console.log(file.message);
        }
      });

      // Print global report
      if (report.status === 'fail') {
        error(report.message, { fail: false, label: 'FAIL' });
        build && build.fail(report.message);
      } else if (report.status === 'warn') {
        warn(report.message);
        build && build.pass(report.message);
      } else {
        info('PASS', report.message);
        build && build.pass(report.message);
      }
    },
  };
};
