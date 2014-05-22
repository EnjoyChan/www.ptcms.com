angular.module('ptcms.services', [])

//
//== 用户
  .factory('Users', ['$resource', function($resource) {
    'use strict';
    var User = $resource('/users/:user', { user: '@user' }, {
      all: { method: 'GET', url: '/users/:user/all', params: { user: '@user' } }
    });
    return User;
  }])

//
//== 年级
  .factory('Grades', ['$resource', function($resource) {
    'use strict';
  }])

//
//== 小组
  .factory('Groups', ['$resource', function($resource) {
    'use strict';
  }])

//
//== 班级
  .factory('Classes', ['$resource', function($resource) {
    'use strict';
    var Classes = $resource('/classes', null,  {
      'all':    { method: 'GET',    url: '/classes' },
      'save':   { method: 'POST',   url: '/classes' },
      'one':    { method: 'GET',    url: '/classes/:classe_number', params: { classe_number: '@classe_number' } },
      'update': { method: 'PUT',    url: '/classes/:classe_number', params: { classe_number: '@classe_number' } },
      'delete': { method: 'DELETE', url: '/classes/:classe_number', params: { classe_number: '@classe_number' } },
    });
    return Classes;
  }]);
