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
  }])

// 角色
  .filter('role', [function() {
    return function(value) {
      var mapping = {
        '00000001': '面试人员',             // 1
        '00000100': '开发人员',             // 4
        '00100000': '小组长',               // 32
        '00100100': '小组长/开发人员',       // 36
        '01000000': '管理员',               // 64
        '01100000': '管理员/小组长',         // 96
        '01100100': '管理员/小组长/开发人员'  // 100
      };
      return mapping[value];
    };
  }]);
