angular.module('ptcms.controllers', [])

//
//== 应用
  .controller('appCtrl', [
    '$cookies',
    '$scope',
    'Users',
  function($cookies, $scope, Users) {
    var number = $cookies['_number'];

    Users.one({ users_number: number }).$promise.then(function(data) {
      $scope.user = data.data.user;
      $scope.menus = data.data.menus;
    });
  }])

//
//== 头部
  .controller('headerCtrl', ['$scope', function($scope) {

  }])

//
//== 侧边栏
  .controller('sidebarCtrl', ['$scope', function($scope) {

  }])

//
//== 仪表盘
  .controller('dashboardCtrl', ['$scope', function($scope) {

  }])


//
//== 年级管理
  .controller('grademanageCtrl', ['$scope', function($scope) {

  }])


//
//== 小组管理
  .controller('groupmanageCtrl', ['$scope', 'Groups', function($scope, Groups) {
    Groups.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.groups = data.data.groups;
    });
  }])

//
//== 班级管理
  .controller('classemanageCtrl', ['$scope', 'Classes', function($scope, Classes) {
    // scope 初始化
    $scope.isVisible = true;

    Classes.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.classes = data.data.classes;
    });

    // 添加班级
    $scope.$on('addClasse', function() {
      var name, alias, isopen, classe = {};
      name = $scope.classename || '';
      alias = $scope.classealias || '';
      isopen = $scope.isopen || false;

      if (!name) return alert('班级名称不能为空');
      classe.name = name;
      classe.alias = alias;
      classe.isopen = isopen;

      Classes.save(classe).$promise.then(function(data) {
        $scope.classes.push(data.data.classe);
        $scope.classename = '';
        $scope.classealias = '';
        $scope.isopen = false;
      });
    });

    // 删除班级
    $scope.$on('deleteClasse', function(e, number) {
      if (!number) return;
      Classes.delete({ classe_number: number }).$promise.then(function(data) {
        Classes.all().$promise.then(function(data) {
          if (data.status !== 1) return alert('发生错误!');
          $scope.classes = data.data.classes;
        });
      });
    });

    // go 修改班级
    $scope.$on('goModifyClasse', function(e, classe) {
      if (!classe) return;
      $scope.classenumber = classe.number;
      $scope.classename = classe.name;
      $scope.classealias = classe.alias;
      $scope.isopen = classe.isOpen;

      $scope.isVisible = false;
      $scope.$saferApply();
    });

    // 修改班级
    $scope.$on('modifyClasse', function(e) {
      var classe = {};

      classe.classe_number = $scope.classenumber || '';
      classe.name = $scope.classename || '';
      classe.alias = $scope.classealias || '';
      classe.isopen = $scope.isopen || false;

      console.dir(classe);

      Classes.update(classe).$promise.then(function() {
        $scope.isVisible = true;
        $scope.classename = '';
        $scope.classealias = '';
        $scope.isopen = false
        Classes.all().$promise.then(function(data) {
          if (data.status !== 1) return alert('发生错误!');
          $scope.classes = data.data.classes;
        });
      });
    });

    // 撤销班级修改
    $scope.$on('revokeModifyClasse', function() {
      $scope.isVisible = true;
      $scope.classename = '';
      $scope.classealias = '';
      $scope.isopen = false
      $scope.$saferApply();
    });
  }])

//
//== 项目管理
  .controller('projectmanageCtrl', ['$scope', function($scope) {

  }])

//
//== 成员列表
  .controller('userslistCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.all().$promise.then(function(data) {
      $scope.users = data.data.users;
    });
  }])

//
//== 新增成员
  .controller('usercreateCtrl', ['$scope', function($scope) {

  }])

//
//== 简历审核
  .controller('resumecheckCtrl', ['$scope', function($scope) {

  }])

//
//== 我的信息
  .controller('myprofileCtrl', ['$scope', function($scope) {

  }])

//
//== 任务管理
  .controller('mytasksCtrl', ['$scope', function($scope) {

  }])

//
//== 密码修改
  .controller('passwordmodifyCtrl', ['$scope', function($scope) {

  }]);

