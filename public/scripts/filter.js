angular.module('cms.filters', [])

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

// 判断在职还是离职
  .filter('userStatus', [function() {
    return function(value) {
      if(value == 'true') {
        return '在职';
      }else {
        return '离职';
      }
    }; 
  }])

// 判断是否管理员
  .filter('isAdmin', [function() {
    return function(value) {
      if(value == '00') {
        return true;
      }else {
        return false;
      }
    }; 
  }])

// 角色
  .filter('role', [function() {
    return function(value) {
      var mapping = {
        '11': '面试人员',             // 1
        '10': '员工',             // 4
        '01': '组长',               // 32
        '00': '管理员',               // 64
      };
      return mapping[value];
    };
  }]);
