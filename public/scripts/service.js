angular.module('ptcms.services', [])

//
//== 用户
  .factory('Users', ['$resource', function($resource) {
    'use strict';
    var Users = $resource('/users', null, {
      'all':     { method: 'GET',    url: '/users' },
      'save':    { method: 'POST',   url: '/users' },
      'one':     { method: 'GET',    url: '/users/:user_id',         params: { user_id: '@user_id' } },
      'update':  { method: 'PUT',    url: '/users/:user_id',         params: { user_id: '@user_id' } },
      'delete':  { method: 'DELETE', url: '/users/:user_id',         params: { user_id: '@user_id' } },
      'allInfo': { method: 'GET',    url: '/users/:user_id/allinfo', params: { user_id: '@user_id' } }
    });
    return Users;
  }])

//
//== 年级
  .factory('Grades', ['$resource', function($resource) {
    'use strict';
    var Grades = $resource('/grades', null, {
      'all':    { method: 'GET',    url: '/grades' },
      'save':   { method: 'POST',   url: '/grades' },
      'one':    { method: 'GET',    url: '/grades/:grade_id', params: { grade_id: '@grade_id' } },
      'update': { method: 'PUT',    url: '/grades/:grade_id', params: { grade_id: '@grade_id' } },
      'delete': { method: 'DELETE', url: '/grades/:grade_id', params: { grade_id: '@grade_id' } },
    });
    return Grades;
  }])

//
//== 小组
  .factory('Groups', ['$resource', function($resource) {
    'use strict';
    var Groups = $resource('/groups', null, {
      'all':    { method: 'GET',    url: '/groups' },
      'save':   { method: 'POST',   url: '/groups' },
      'one':    { method: 'GET',    url: '/groups/:group_id', params: { group_id: '@group_id' } },
      'update': { method: 'PUT',    url: '/groups/:group_id', params: { group_id: '@group_id' } },
      'delete': { method: 'DELETE', url: '/groups/:group_id', params: { group_id: '@group_id' } },
    });
    return Groups;
  }])

//
//== 班级
  .factory('Classes', ['$resource', function($resource) {
    'use strict';
    var Classes = $resource('/classes', null, {
      'all':    { method: 'GET',    url: '/classes' },
      'save':   { method: 'POST',   url: '/classes' },
      'one':    { method: 'GET',    url: '/classes/:classe_id', params: { classe_id: '@classe_id' } },
      'update': { method: 'PUT',    url: '/classes/:classe_id', params: { classe_id: '@classe_id' } },
      'delete': { method: 'DELETE', url: '/classes/:classe_id', params: { classe_id: '@classe_id' } },
    });
    return Classes;
  }]);
