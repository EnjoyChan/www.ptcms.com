angular.module('ptcms.filters', [])

// 是否开启
  .filter('isopen', [function() {
    return function(value) {
      var mapping = {
        'true':   '开启',
        'false':  '关闭'
      };
      return mapping[value];
    };
  }]);
