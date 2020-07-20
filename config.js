const axios = require('axios');

const configure = () => {
  // configure Axios and other resources
  // response interception
  axios.interceptors.response.use(
    response => Promise.resolve(response),
    error => Promise.reject(
      error && error.response && error.response.status
        ? error.response.status
        : 'Unknown error'
    )
  );
};

module.exports = {
  configure
};
