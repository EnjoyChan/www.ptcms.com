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
        '00000001': '面试人员',
        '00000100': '成员',
        '00100100': '小组长',
        '01000100': '管理员',
        '01100100': '管理员/小组长'
      };
      return mapping[value];
    };
  }]);
