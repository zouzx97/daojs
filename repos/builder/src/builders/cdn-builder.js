const rp = require('request-promise-native');

module.exports = function cdnBuilder() {
  return (source, { output }, { urls }) => rp.get(urls[output]);
};
