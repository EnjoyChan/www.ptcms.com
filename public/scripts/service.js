angular.module('ptcms.services', [])

//
//== 用户
  .factory('Users', ['$resource', function($resource) {
    'use strict';
    var Users = $resource('/users', null, {
      'all':     { method: 'GET',    url: '/users' },
      'save':    { method: 'POST',   url: '/users' },
      'one':     { method: 'GET',    url: '/users/:users_number',         params: { users_number: '@users_number' } },
      'update':  { method: 'PUT',    url: '/users/:users_number',         params: { users_number: '@users_number' } },
      'delete':  { method: 'DELETE', url: '/users/:users_number',         params: { users_number: '@users_number' } },
      'allInfo': { method: 'GET',    url: '/users/:users_number/allinfo', params: { users_number: '@users_number' } }
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
      'one':    { method: 'GET',    url: '/grades/:grade_number', params: { classe_number: '@grade_number' } },
      'update': { method: 'PUT',    url: '/grades/:grade_number', params: { classe_number: '@grade_number' } },
      'delete': { method: 'DELETE', url: '/grades/:grade_number', params: { classe_number: '@grade_number' } },
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
      'one':    { method: 'GET',    url: '/groups/:group_number', params: { classe_number: '@group_number' } },
      'update': { method: 'PUT',    url: '/groups/:group_number', params: { classe_number: '@group_number' } },
      'delete': { method: 'DELETE', url: '/groups/:group_number', params: { classe_number: '@group_number' } },
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
      'one':    { method: 'GET',    url: '/classes/:classe_number', params: { classe_number: '@classe_number' } },
      'update': { method: 'PUT',    url: '/classes/:classe_number', params: { classe_number: '@classe_number' } },
      'delete': { method: 'DELETE', url: '/classes/:classe_number', params: { classe_number: '@classe_number' } },
    });
    return Classes;
  }]);
