module.exports = (ciEnvironment, api, reporter, parse) => {
  return {
    run: (files) => {
      reporter.reportStart();
      if (api && ciEnvironment) {
        api
          .get()
          .then(masterValues => parse(files, masterValues))
          .then(result => {
            if (
              result.files &&
              result.status !== 'fail' &&
              ciEnvironment.event_type === 'push' &&
              ciEnvironment.branch === 'master'
            ) {
              api.set(result.files);
            }
            reporter.reportResult(result);
          })
          .catch(err => {
            reporter.reportError(err);
            process.exit(1);
          });
      } else {
        reporter.reportResult(parse(files));
      }
    },
  };
};
