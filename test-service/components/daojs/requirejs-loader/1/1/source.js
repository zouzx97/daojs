window.requireJsConfig = function (mapping) {
  var paths = {};
  var map = {};
  var data;

  for (var key in mapping) {
    data = mapping[key];
    paths[key] = key.replace('@', '/') + '/' + data.subversion + '/index';
    if (data.name) {
      map[data.name] = key;
    }
  }

  window.require = {
    baseUrl: '/build/debug/',
    paths: paths,
    map: { '*': map },
  };
};