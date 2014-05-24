angular.module('ptcms.controllers', [])

//
//== 应用
  .controller('appCtrl', [
    '$cookies',
    '$scope',
    'Users',
  function($cookies, $scope, Users) {
    var userid = $cookies['_id'];

    Users.one({ user_id: userid }).$promise.then(function(data) {
      $scope.user = data.data.user;
      $scope.menus = data.data.menus;
    });

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
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
  .controller('groupmanageCtrl', ['$scope', 'Groups', 'Users', function($scope, Groups, Users) {

    $scope.status = 'normal';
    $scope._id = '';

    // 定义scope
    Users.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.users = data.data.users;
    });

    Groups.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.groups = data.data.groups || [];
    });

    // 定义方法
    var updateForm = function(name, leader, description, isopen, begintime) {
      $scope.groupname        = name        || '';
      $scope.groupleader      = leader      || '';
      $scope.groupdescription = description || '';
      $scope.groupisopen      = isopen      || false;
      $scope.groupbegintime   = begintime   || '';
    };

    // 事件定义
    $scope.$on('addGroup', function() {
      var newGroup = {
        name        : $scope.groupname,
        leader      : $scope.groupleader,
        description : $scope.groupdescription,
        isopen      : $scope.groupisopen,
        begintime   : $scope.groupbegintime
      };
      if (!newGroup.name) { return alert('名称不能为空'); }
      Groups.save(newGroup).$promise.then(function(data) {
        if (data.status !== 1) return alert(data.msg || '发生错误!');
        $scope.groups.unshift(data.data.group);
        updateForm();
      });
    });

    $scope.$on('goUpdateGroup', function(e, group) {
      $scope._id = group._id;
      updateForm(group.name, group.leader, group.description, group.isOpen, group.beginTime);
      $scope.status = 'update';
      $scope.$saferApply();
    });

    $scope.$on('updateGroup', function(e, id) {
      var updateGroup = {
        group_id    : $scope._id,
        name        : $scope.groupname,
        leader      : $scope.groupleader,
        description : $scope.groupdescription,
        isopen      : $scope.groupisopen,
        begintime   : $scope.groupbegintime
      };
      Groups.update(updateGroup).$promise.then(function(data) {
        if (data.status !== 1) return alert(data.msg || '发生错误');
        alert(data.msg);
        Groups.all().$promise.then(function(data) {
          if (data.status !== 1) return alert('发生错误!');
          $scope.groups = data.data.groups || [];
        });
      });
      // $scope.$saferApply();
    });

    $scope.$on('deleteGroup', function(e, group) {
      Groups.delete({ group_id: group._id}).$promise.then(function(data) {
        if (data.status !== 1) return alert(data.msg || '发生错误');
        Groups.all().$promise.then(function(data) {
          if (data.status !== 1) return alert('发生错误!');
          $scope.groups = data.data.groups || [];
        });
      });
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
    $scope.$on('deleteClasse', function(e, id) {
      if (!id) return;
      Classes.delete({ classe_id: id }).$promise.then(function(data) {
        Classes.all().$promise.then(function(data) {
          if (data.status !== 1) return alert('发生错误!');
          $scope.classes = data.data.classes;
        });
      });
    });

    // go 修改班级
    $scope.$on('goModifyClasse', function(e, classe) {
      if (!classe) return;
      $scope.classeid = classe._id;
      $scope.classename = classe.name;
      $scope.classealias = classe.alias;
      $scope.isopen = classe.isOpen;

      $scope.isVisible = false;
      $scope.$saferApply();
    });

    // 修改班级
    $scope.$on('modifyClasse', function(e) {
      var classe = {};

      classe.classe_id = $scope.classeid || '';
      classe.name = $scope.classename || '';
      classe.alias = $scope.classealias || '';
      classe.isopen = $scope.isopen || false;


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
  .controller('usercreateCtrl', ['$scope', 'Groups', 'Users', function($scope, Groups, Users) {
    // 定义scope
    $scope.roles = ['00000001','00000100','00100000','01000000'];
    Groups.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.groups = data.data.groups;
    });

    $scope.selectedRoles = ['00000100'];
    $scope.selectedGroups = [1];

    $scope.addUserMsg = '';

    // 方法
    $scope.toggleselectedRoles = function(role) {
      var idx = $scope.selectedRoles.indexOf(role);
      if (idx > -1) { $scope.selectedRoles.splice(idx, 1); }
      else { $scope.selectedRoles.push(role) }
    };

    $scope.toggleselectedGroups = function(role) {
      var idx = $scope.selectedGroups.indexOf(role);
      if (idx > -1) { $scope.selectedGroups.splice(idx, 1); }
      else { $scope.selectedGroups.push(role) }
    };

    // 添加用户
    $scope.$on('addUser', function(e) {
      var user = {};
      user.account = $scope.useraccount;
      user.password = $scope.userpassword || '123';
      user.jointime = $scope.userjointime;
      user.group = $scope.selectedGroups;
      user.role = $scope.selectedRoles;

      if (!user.account) {
        $scope.addUserMsg = '登录账号不能为空';
        $scope.$saferApply();
        return;
      }
      if ($scope.selectedRoles.length === 0) {
        $scope.addUserMsg = '请选择成员担任角色';
        $scope.$saferApply();
        return;
      }
      if ($scope.selectedGroups.length === 0) {
        $scope.addUserMsg = '请选择成员所在小组';
        $scope.$saferApply();
        return;
      }
      Users.save(user).$promise.then(function(data) {
        if (data.status !== 1) $scope.addUserMsg = data.msg;
        $scope.useraccount = "";
        $scope.userpassword = "";
        $scope.userjointime = "";
        $scope.selectedGroups = [1];
        $scope.selectedRoles = ['00000100'];
        $scope.addUserMsg = data.msg;
      });
    });
  }])

//
//== 简历审核
  .controller('resumecheckCtrl', ['$scope', function($scope) {

  }])

//
//== 我的信息
  .controller('myprofileCtrl', ['$scope', '$cookies', 'Users', function($scope, $cookies, Users) {
    // 定义scope
    var userid = $cookies['_id'];

    $scope.normal = true;

    Users.one({ users_id: userid }).$promise.then(function(data) {
      $scope.info = data.data.user;
    });

    // 前往编辑
    $scope.$on('goInfoEdit', function() {
      $scope.normal = false;
      $scope.$saferApply();
    });
    // 取消编辑
    $scope.$on('revokeEdit', function() {
      $scope.normal = true;
      Users.one({ users_id: userid }).$promise.then(function(data) {
        $scope.info = data.data.user;
        $scope.$saferApply();
      });
    });
    // 更新编辑
    $scope.$on('updateEdit', function() {
      alert('yes');
    });
  }])

//
//== 任务管理
  .controller('mytasksCtrl', ['$scope', function($scope) {

  }])

//
//== 密码修改
  .controller('passwordmodifyCtrl', ['$scope', function($scope) {

  }]);

