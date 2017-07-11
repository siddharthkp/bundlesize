const axios = require('axios');
const url = 'https://bundlesize-store-iothfynuyu.now.sh/values';

module.exports = ciEnvironment => {
  if (!ciEnvironment) {
    return null;
  }

  const { repo, token, sha } = ciEnvironment;

  return {
    get: () => {
      return axios.get(`${url}?repo=${repo}&token=${token}`).then(response => {
        const values = {};
        if (response && response.data && response.data.length) {
          response.data.map(file => (values[file.path] = file.size));
        }
        return values;
      });
    },

    set: values => {
      return axios.post(url, { repo, token, sha, values });
    },
  };
};
