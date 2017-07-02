module.exports = (ciEnvironment, api, reporter, parse) => {
  return {
    run: (files) => {
      reporter.reportStart();
      if (api && ciEnvironment) {
        api
          .get()
          .then(masterValues => {
            const result = parse(files, masterValues);
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
            reporter.reportFatal(err);
          });
      } else {
        reporter.reportResult(parse(files));
      }
    },
  };
};
