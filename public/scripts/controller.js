angular.module('cms.controllers', [])

//
//== 应用
  .controller('appCtrl', [
    '$cookies',
    '$scope',
    'Users',
    'Broadcasts',
    'Feedbacks',
  function($cookies, $scope, Users, Broadcasts, Feedbacks) {
    var userid = $cookies['_id'];

    Users.one({ user_id: userid }).$promise.then(function(data) {
      $scope.user = data.data.user;
      $scope.menus = data.data.menus;
      $scope.alerts = data.data.user.feedbacks;

      Broadcasts.all().$promise.then(function(data) {
        $scope.broadcasts = _.slice(data.broadcasts, 0, 6);
      });
    });

    $scope.showMenu = function(){
      // $('.page-sidebar').toggleClass('open');
      if ($('.page-sidebar').hasClass('open')) {
          $('.page-sidebar').slideDown(300);
          $('.page-sidebar').removeClass('open');
        } else {
          $('.page-sidebar').slideUp(300);
          $('.page-sidebar').addClass('open').siblings('li').removeClass('open').children('.submenus').slideUp(300);
      }
    }

    $scope.closeAlert = function(index,id) {
      $scope.alerts.splice(index, 1);
      // feedback、user删除
      var user = {
        user_id: userid
      };
      user.feedbacks = _.pluck($scope.alerts, '_id');
      Users.update(user);
      Feedbacks.delete({feedback_id: id});
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
//== 小组列表
  .controller('grouplistCtrl', ['$scope', 'Groups', 'Users', function($scope, Groups, Users) {

    $scope.status = 'normal';
    $scope._id = '';
    $scope.query = '';

    $scope.changeQuery = function() {
      if($scope.query) {
        var query = {isOpen: $scope.query};
      } else {
        var query = {};
      }
      Groups.all(query).$promise.then(function(data) {
        if(data.status !== 1) return alert('发生错误！');
        $scope.groups = _.merge(data.data.groups, data.data.leaders) || [];          
      });
    }

    // 定义scope
    Groups.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.groups = _.merge(data.data.groups, data.data.leaders) || [];
    });

    $scope.$on('changeState', function(e, data) {
      data.state = data.state == '关闭' ? 'false' : 'true';

      Groups.update({group_id: data.id, isOpen: data.state}).$promise.then(function(data){
        if (data.status !== 1) return alert(data.msg || '发生错误');
        var query = $scope.query ? {isOpen: $scope.query} : {};
        Groups.all(query).$promise.then(function(data) {
          if(data.status !== 1) return alert('发生错误！');
          $scope.groups = _.merge(data.data.groups, data.data.leaders) || [];          
        });
      })
    });
  }])

// 
// == 小组信息
  .controller('groupdetailCtrl', ['$scope', 'Groups', 'Roles', '$stateParams', function($scope, Groups, Roles, $stateParams) {
    $scope.isEdit = false;
    $scope.oper = '编辑';
    $scope.selectedStaff = null;

    Groups.one({ group_id: $stateParams.id }).$promise.then(function(data){
      $scope.info = data.group;
    });

    Roles.one({role_num: '01'}).$promise.then(function(data){
      $scope.allLeaders = data.users;   
    });

    $scope.$on('showModal', function() {
      Roles.one({role_num: '10'}).$promise.then(function(data){
        $scope.allStaffs = data.users; 
      });
      $scope.$saferApply();
    });

    $scope.$on('revokeEdit', function() {
      $scope.isEdit = false;
      Groups.one({ group_id: $stateParams.id }).$promise.then(function(data){
        $scope.info = data.group;
        $scope.oper = '编辑';
      });
      $scope.errorMsg = '';
      $scope.$saferApply();
    }); 

    $scope.$on('addTag', function() {
      var length = $scope.info.currentStaffs.length;
      if($scope.selectedStaff) {
        var selectedStaff = $scope.selectedStaff.split('/');
        $scope.selectedStaff = {_id: Number(selectedStaff[0]), username: selectedStaff[1]};
        $scope.info.currentStaffs[length] = $scope.selectedStaff;
      }
      $('#myModal').hide();
      $scope.$saferApply();
    });

    $scope.$on('deleteTag', function(event,data) {
      data = Number(data);
      _.remove($scope.info.currentStaffs, function(staff) {
        return staff._id == data;
      });
      $scope.$saferApply();
    });
    
    $scope.$on('goInfoEdit', function() {
      $scope.isEdit = true;
      $scope.oper = '确认更新';
      $scope.$saferApply();
    });

    $scope.$on('goUpdate', function(){
      if(!$scope.info.name) {
        $scope.errorMsg = '组名不能为空';
        $scope.$saferApply();
        return;
      }
      var updateGroup = {
        group_id        : $stateParams.id,
        name            : $scope.info.name,
        isOpen          : $scope.info.isOpen || '',
        currentLeader   : Number($scope.info.currentLeader._id) || '',
        description     : $scope.info.description || ''
      };
      updateGroup.currentStaffs = _.pluck($scope.info.currentStaffs, '_id');
      Groups.update(updateGroup).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        Groups.one({ group_id: $stateParams.id }).$promise.then(function(data){
          $scope.info = data.group;
        });
        $('#operationBtn').removeClass('btn-warning').addClass('btn-primary');
        $scope.oper = '编辑';
        $scope.isEdit = false;
        alert(data.msg);
      });
      $scope.$saferApply();
    });
  }])

// 
// == 创建小组
  .controller('groupcreateCtrl', ['$scope', 'Groups', 'Roles', '$stateParams', function($scope, Groups, Roles, $stateParams) {
    $scope.selectedStaff = null;
    $scope.info = {};
    $scope.chooseStaffs = [];

    Roles.one({role_num: '01'}).$promise.then(function(data){
      $scope.allLeaders = data.users;   
    });

    $scope.$on('showModal', function() {
      Roles.one({role_num: '10'}).$promise.then(function(data){
        $scope.allStaffs = data.users; 
      });
      $scope.$saferApply();
    });

    $scope.$on('addTag', function() {
      if($scope.selectedStaff) {
        var selectedStaff = $scope.selectedStaff.split('/');
        $scope.selectedStaff = {_id: Number(selectedStaff[0]), username: selectedStaff[1]};
        $scope.chooseStaffs.push($scope.selectedStaff);
      }
      $('#myModal').hide();
      $scope.$saferApply();
    });

    $scope.$on('deleteTag', function(event,data) {
      data = Number(data);
      _.remove($scope.chooseStaffs, function(staff) {
        return staff._id == data;
      });
      $scope.$saferApply();
    });

    $scope.$on('addDoc', function(){
      if(!$scope.info.name) {
        $scope.errorMsg = '组名不能为空';
        $scope.$saferApply();
        return;
      }
      $scope.info.currentLeader = Number($scope.info.currentLeader);
      $scope.info.currentStaffs = _.pluck($scope.chooseStaffs,'_id');
      Groups.save($scope.info).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert(data.msg);
        $scope.info = {};
        $scope.chooseStaffs = [];
        $scope.errorMsg = '';
      });
    });
  }])

//
//== 项目列表
  .controller('projectlistCtrl', ['$scope', 'Projects', function($scope, Projects) {

    Projects.all().$promise.then(function(data) {
      $scope.info = _.merge(data.data.projects, data.data.groupNames);
    });
    
    $scope.changeQuery = function() {
      var query = {};
      if($scope.query) {
        query = {status: $scope.query};
      }
      Projects.all(query).$promise.then(function(data) {
        $scope.info = _.merge(data.data.projects, data.data.groupNames);
      });
    };

  }])
// 
// == 项目创建
  .controller('projectcreateCtrl', ['$scope', 'Projects', 'Groups', '$cookies', function($scope, Projects, Groups, $cookies) {
    $scope.info = {};

    Groups.all({isOpen: 'true'}).$promise.then(function(data) {
      if(data.status !== 1) return alert('发生错误！');
      $scope.allgroups = data.data.groups;  
    });

    $scope.$on('addDoc', function(){
      if(!$scope.info.name) {
        $scope.errorMsg = '项目名不能为空';
        $scope.$saferApply();
        return;
      }

      if($scope.info.group) {
        $scope.info.group  = Number($scope.info.group);
        $scope.info.status = '已分配';
      } else {
        $scope.info.status = '未分配';
      }

      $scope.info.creator = $cookies['_id'];

      Projects.save($scope.info).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert(data.msg);
        $scope.info = {};
      });
    });
  }])
// 
// == 项目信息
  .controller('projectdetailCtrl', ['$scope', 'Projects', '$stateParams', function($scope, Projects, $stateParams) {
    $scope.isEdit = false;
    $scope.oper = '编辑';
    $scope.id = $stateParams.id;
    var proState = '';

    Projects.one({ project_id: $stateParams.id }).$promise.then(function(data){
      $scope.info = data.project;
      proState = data.project.status;
    });

    $scope.$on('revokeEdit', function() {
      $scope.isEdit = false;
      Projects.one({ project_id: $stateParams.id }).$promise.then(function(data){
        $scope.info = data.project;
        $scope.oper = '编辑';
      });
      $scope.errorMsg = '';
      $scope.$saferApply();
    }); 
    
    $scope.$on('goInfoEdit', function() {
      $scope.isEdit = true;
      $scope.oper = '确认更新';
      $scope.$saferApply();
    });

    $scope.$on('goUpdate', function(){
      if(!$scope.info.name) {
        $scope.errorMsg = '项目名不能为空';
        $scope.$saferApply();
        return;
      }
      var updateProject = {
        project_id        : $stateParams.id,
        name              : $scope.info.name,
        description       : $scope.info.description || '',
        group             : $scope.info.group._id
      };
      if(proState == '未分配' && $scope.info.group) updateProject.status == '已分配';
      if(proState == '已分配' && !$scope.info.group) updateProject.status == '未分配';
      Projects.update(updateProject).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        Projects.one({ project_id: $stateParams.id }).$promise.then(function(data){
          $scope.info = data.project;
        });
        $scope.oper = '编辑';
        $scope.isEdit = false;
        alert(data.msg);
      });
      $scope.$saferApply();
    });
  }])


// 
// == 用户信息
  .controller('userdetailCtrl', ['$scope', 'Users', '$stateParams', function($scope, Users, $stateParams) {
    $scope.isEdit = false;
    $scope.oper = '编辑';

    Users.one({ user_id: $stateParams.id }).$promise.then(function(data) {
      $scope.info = data.data.user;
    });

    $scope.$on('revokeEdit', function() {
      $scope.isEdit = false;
      Users.one({ user_id: $stateParams.id }).$promise.then(function(data){
        $scope.info = data.data.user;
        $scope.oper = '编辑';
      });
      $scope.errorMsg = '';
      $scope.$saferApply();
    }); 
    
    $scope.$on('goInfoEdit', function() {
      $scope.isEdit = true;
      $scope.oper = '确认更新';
      $scope.$saferApply();
    });

    $scope.$on('goUpdate', function(){
      if(!$scope.info.username){
        $scope.errorMsg = '姓名不能为空！';
        $scope.$saferApply();
        return;
      }
      if($scope.info.status == 'true' && !$scope.info.account){
        $scope.errorMsg = '在职人员帐号不能为空！';
        $scope.$saferApply();
        return;
      }
      var user = {
        user_id: $stateParams.id,
        username: $scope.info.username,
        account: $scope.info.account || '',
        status: $scope.info.status,
        role: $scope.info.role.number,
        phone: $scope.info.phone || '',
        birthday: $scope.info.birthday || '',
        introduction: $scope.info.introduction || ''
      };
      Users.update(user).$promise.then(function(data) {
        if (data.status == 1){
          Users.one({ user_id: $stateParams.id }).$promise.then(function(data) {
            $scope.info = data.data.user;
          });
          $scope.oper = '编辑';
          $('#operationBtn').removeClass('btn-warning').addClass('btn-primary');
          $scope.isEdit = false;
          alert(data.msg);
        }else {
          $scope.errorMsg = data.msg;
        }
      });
      $scope.$saferApply();
    });
  }])

//
//== 成员列表
  .controller('userslistCtrl', ['$scope', 'Users', 'Roles',  function($scope, Users, Roles) {
    Users.all().$promise.then(function(data) {
      $scope.users = data.data.users;
    });

    $scope.changeQuery = function() {
      if($scope.query) {
        Roles.one({role_num: $scope.query}).$promise.then(function(data){
          $scope.users = data.users;   
        });
      } else {
        Users.all().$promise.then(function(data) {
          $scope.users = data.data.users;
        });
      }
    };
  }])

//
//== 新增成员
  .controller('usercreateCtrl', ['$scope', 'Groups', 'Users', function($scope, Groups, Users) {
    // 定义scope
    $scope.roles = ['00','01','10','11'];
    Groups.all().$promise.then(function(data) {
      if (data.status !== 1) return alert('发生错误!');
      $scope.groups = _.remove(data.data.groups, function(group){ return group.isOpen == 'true'});
      $scope.selectedGroups = [$scope.groups[0]._id];
      $scope.belongGroup = [$scope.groups[0]._id];
    });

    $scope.role = '00';

    $scope.addUserMsg = '';

    // 方法
    $scope.togglebelongGroup = function(role) {
      $scope.belongGroup = [role];
    };

    $scope.toggleselectedGroups = function(role) {
      var idx = $scope.selectedGroups.indexOf(role);
      if (idx > -1) { $scope.selectedGroups.splice(idx, 1); }
      else { $scope.selectedGroups.push(role) }
    };

    // 添加用户
    $scope.$on('addDoc', function(e) {
      var user = {};
      user.account = $scope.useraccount;
      user.password = $scope.userpassword || '123';
      user.birthday = $scope.userbirthday || '';
      user.phone = $scope.userphone || '';
      user.role = $scope.role;
      if(user.role == '10') user.currentGroup = $scope.selectedGroups || [];
      if(user.role == '01') user.currentGroup = $scope.belongGroup || [];
      user.username = $scope.username || '佚名';

      if (!user.account) {
        $scope.addUserMsg = '登录账号不能为空!';
        $scope.$saferApply();
        return;
      }
      if (!$scope.role) {
        $scope.addUserMsg = '请选择成员担任角色!';
        $scope.$saferApply();
        return;
      }
      Users.save(user).$promise.then(function(data) {
        if (data.status !== 1) $scope.addUserMsg = data.msg;
        $scope.useraccount = '';
        $scope.userpassword = '';
        $scope.userbirthday = '';
        $scope.userphone = '';
        $scope.username = '';
        $scope.selectedGroups = [$scope.groups[0]._id];
        $scope.belongGroup = [$scope.groups[0]._id];
        $scope.role = '00';
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
    
    Users.one({ user_id: userid }).$promise.then(function(data) {
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
      $scope.addUserMsg = '';
      Users.one({ user_id: userid }).$promise.then(function(data) {
        $scope.info = data.data.user;
      });
      $scope.$saferApply();
    });
    // 更新编辑
    $scope.$on('updateEdit', function() {
      if(!$scope.info.username || $scope.info.username == ''){
        $scope.addUserMsg = '姓名不能为空';
        $scope.$saferApply();
        return;
      }else{
        var user = {
          user_id: $scope.info.id,
          username: $scope.info.username,
          phone: $scope.info.phone || '',
          birthday: $scope.info.birthday || '',
          introduction: $scope.info.introduction || ''
        };
        Users.update(user).$promise.then(function(data) {
          if (data.status == 1){
            location.reload() 
          }else {
            $scope.addUserMsg = data.msg;
          }
        });
      }
    });
  }])

// 
// == 公告
  .controller('broadcastcreateCtrl', ['$scope', '$cookies', 'Broadcasts', function($scope, $cookies, Broadcasts) {
    $scope.description = '';
    $scope.$on('submitBroadcast', function() {
      if(!$scope.description) {
        alert('发布的内容不能为空！');
        return;
      }
      var userid = $cookies['_id'],
          condition = {
            description: $scope.description,
            creator: userid
          };
      Broadcasts.save(condition).$promise.then(function(data){
        alert(data.msg);
        if(data.status == 1) {
          $scope.description = '';
        }
      });
    });
  }])

  .controller('broadcastlistCtrl', ['$scope', 'Broadcasts', function($scope, Broadcasts) {
    Broadcasts.all().$promise.then(function(data) {
      $scope.info = data.broadcasts;
    });
    $scope.$on('deleteDoc', function(event, data) {
      var condition = {broadcast_id: data};
      Broadcasts.delete(condition).$promise.then(function(data){
        alert(data.msg);
        if(data.status == 1) {
          Broadcasts.all().$promise.then(function(data) {
            $scope.info = data.broadcasts;
          });
        }
      });
    });
  }])

// 
// == 任务创建
  .controller('taskcreateCtrl',['$scope', 'Tasks', 'Users', '$cookies', 'Groups', function($scope, Tasks, Users, $cookies, Groups) {
    $scope.groupSelected = false;
    $scope.info = {};

    var userid = $cookies['_id'];

    Users.one({ user_id: userid }).$promise.then(function(data) {
      $scope.allgroups = data.data.user.currentGroup;

    });

    $scope.nextOper = function() {
      if(!$scope.selectedGroup) return $scope.errorMsg = '请选择小组！';

      $scope.errorMsg = '';
      $scope.groupSelected = true;

      Groups.one({ group_id: Number($scope.selectedGroup)}).$promise.then(function(data) {
        $scope.allprojects = data.group.projects;
        $scope.allstaffs = data.group.currentStaffs;
      });
    };

    $scope.$on('addDoc', function(){
      if(!$scope.info.schedule) {
        $scope.errorMsg = '任务内容不能为空！';
        $scope.$saferApply();
        return;
      }
      if(!$scope.info.action) {
        $scope.errorMsg = '请选择执行者！';
        $scope.$saferApply();
        return;
      }

      $scope.info.creator = userid;
      $scope.info.project = Number($scope.info.project);
      $scope.info.action = Number($scope.info.action);
      Tasks.save($scope.info).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert(data.msg);
        $scope.info = {};
      });
    });
  }])

//
//== 项目列表
  .controller('tasklistCtrl', ['$scope', 'Tasks', 'Users', 'Groups', '$cookies', function($scope, Tasks, Users, Groups, $cookies) {
    
    var userid = $cookies['_id'];

    Tasks.all({creator: userid}).$promise.then(function(data) {
      $scope.info = _.merge(data.data.tasks, data.data.actionNames);
    });

    Users.one({ user_id: userid }).$promise.then(function(data) {
      $scope.allGroups = data.data.user.currentGroup;
    });
    
    $scope.changeGroup = function() {
      var query = {};
      $scope.project = '';

      if($scope.selectedGroup) {
        query = { group_id: $scope.selectedGroup };
        Groups.one(query).$promise.then(function(data) {
          $scope.allProjects = data.group.projects;
        });
      }
    };

    $scope.query = function() {
      var query = {creator: userid};
      var project = $scope.project;
      if(project) query.project = project;

      Tasks.all(query).$promise.then(function(data) {
        $scope.info = _.merge(data.data.tasks, data.data.actionNames);
      });
    };

  }])
// 
// == 任务详情
  .controller('taskdetailCtrl', ['$scope', 'Tasks', '$stateParams', function($scope, Tasks, $stateParams) {
    $scope.isEdit = false;
    $scope.oper = '编辑';
    $scope.id = $stateParams.id;
    var proState = '';

    Tasks.one({ task_id: $stateParams.id }).$promise.then(function(data){
      $scope.info = data.task;
    });
  }])

//
//== 任务管理
  .controller('mytasksCtrl', ['$scope', 'Tasks', '$cookies', function($scope, Tasks, $cookies) {
    var userid = $cookies['_id'];

    Tasks.all({action: userid}).$promise.then(function(data) {
      $scope.tasks =_.merge( _.merge(data.data.tasks, data.data.actionNames), data.data.creatorNames);
    });

    $scope.changeQuery = function() {
      var query = {action: userid};
      if($scope.query) {
        query.status = $scope.query;
      }
      Tasks.all(query).$promise.then(function(data) {
        $scope.tasks =_.merge( _.merge(data.data.tasks, data.data.actionNames), data.data.creatorNames);
      });
    };

    $scope.$on('changeStatus', function(event, data) {
      var updateTask = {task_id: data.id, status: data.status};
      if(data.status == '开启') updateTask.beginTime = new Date().getTime();
      if(data.status == '完成') updateTask.endTime = new Date().getTime();
      Tasks.update(updateTask).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert(data.msg);
        Tasks.all({action: userid}).$promise.then(function(data) {
          $scope.tasks =_.merge( _.merge(data.data.tasks, data.data.actionNames), data.data.creatorNames);
        });
      });
    });

  }])

//== 我的小组
  .controller('mygroupsCtrl', [function() {

  }])

//== 小组成员
  .controller('groupmembersCtrl', ['$scope', 'Groups', function($scope, Groups) {
    $scope.members = [];

    $scope.changeQuery = function() {
      if(!$scope.query) {
        $scope.info = {};
      } else {
        Groups.one({ group_id: Number($scope.query) }).$promise.then(function(data){
          $scope.info = data.group;
        });
      }
    };

    $scope.$on('changeStatus', function(event, data) {
      var updateProject = {project_id: data.id, status: data.status};
      if(data.status == '开启') updateProject.beginTime = new Date().getTime();
      if(data.status == '完成') updateProject.endTime = new Date().getTime();
      Projects.update(updateProject).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert(data.msg);
        Groupprojects.all({groups: groups}).$promise.then(function(data) {
          if(data.status == 0) alert(data.msg);
          $scope.projects = _.flatten(data.data);
        });
      });
    });
  }])

//
//== 小组项目
  .controller('groupprojectsCtrl', ['$scope', 'Groupprojects', 'Projects', function($scope, Groupprojects, Projects) {
    var user = $scope.user;
    var groups = _.pluck(user.currentGroup, '_id');

    Groupprojects.all({groups: groups}).$promise.then(function(data) {
      if(data.status == 0) alert(data.msg);
      $scope.projects = _.flatten(data.data);
    });

    $scope.changeQuery = function() {
      var query = {};
      if(!$scope.query) {
        query = {groups: groups};
      } else {
        query = {groups: [Number($scope.query)]};
      }
      Groupprojects.all(query).$promise.then(function(data) {
        if(data.status == 0) alert(data.msg);
        $scope.projects = _.flatten(data.data);
      });
    };

    $scope.$on('changeStatus', function(event, data) {
      var updateProject = {project_id: data.id, status: data.status};
      if(data.status == '开启') updateProject.beginTime = new Date().getTime();
      if(data.status == '完成') updateProject.endTime = new Date().getTime();
      Projects.update(updateProject).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert(data.msg);
        Groupprojects.all({groups: groups}).$promise.then(function(data) {
          if(data.status == 0) alert(data.msg);
          $scope.projects = _.flatten(data.data);
        });
      });
    });
  
  }])

  .controller('teaminfoCtrl', [function() {

  }])

  .controller('teamfratureCtrl', [function() {

  }])

  .controller('teamcontactCtrl', [function() {

  }])

  .controller('myresumeCtrl', ['$scope', 'Users', 'Resumes', '$cookies', function($scope, Users,  Resumes, $cookies) {
    $scope.info = {};
    $scope.info.role = '组长';
    var userid = $cookies['_id'];
    var resume_id;

    Users.one({ user_id: userid }).$promise.then(function(data){
      if(data.data.user.resume) {
        resume_id = data.data.user.resume;
        Resumes.one({resume_id: resume_id}).$promise.then(function(data){
          $scope.normal = true;
          $scope.isExit = true;
          $scope.isForm = true;
          $scope.oper = '编辑';
          $scope.info = data.resume;
        });        

      } else {
        $scope.isExit = false;
        $scope.isForm = false;
      }
    });

    $scope.showForm = function() {
      $scope.isExit = true;
      $scope.oper = '保存';
      $scope.isForm = true;
      $scope.nomal = false;
      // $scope.$saferApply();
    };

    $scope.upload = function() {
      Resumes.update({resume_id: resume_id, status: '已投递'}).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        alert('投递成功!');
      });
    };


    $scope.$on('revokeEdit', function() {
      $scope.isEdit = false;
      Resumes.one({ group_id: $stateParams.id }).$promise.then(function(data){
        $scope.info = data.group;
        $scope.oper = '编辑';
      });
      $scope.errorMsg = '';
      $scope.$saferApply();
    }); 

    $scope.$on('save', function() {
      if(!$scope.info.name || !$scope.info.role) {
        $scope.errorMsg = '带*为必填信息！';
        return;
      }
      $scope.info.userid = userid;
      Resumes.save($scope.info).$promise.then(function(data){
        alert(data.msg);
        if(data.status == 1) {
          $scope.normal = true;
          $scope.oper = '编辑';
        }
      });
    });
    
    $scope.$on('goInfoEdit', function() {
      $scope.normal = false;
      $scope.oper = '确认更新';
      $scope.$saferApply();
    });

    $scope.$on('goUpdate', function(){
      if(!$scope.info.name) {
        $scope.errorMsg = '姓名不能为空';
        $scope.$saferApply();
        return;
      }
      $scope.info.resume_id = resume_id;
      $scope.info.updateTime = new Date().getTime();
      Resumes.update($scope.info).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        Resumes.one({resume_id: resume_id}).$promise.then(function(data){
          $scope.normal = true;
          $scope.isExit = true;
          $scope.isForm = true;
          $scope.oper = '编辑';
          $scope.info = data.resume;
        }); 
        $('#operationBtn').removeClass('btn-warning').addClass('btn-primary');
        alert(data.msg);
      });
      $scope.$saferApply();
    });

  }])

  .controller('resumedetailCtrl', ['$scope', 'Resumes', '$stateParams', function($scope, Resumes, $stateParams) {
    $scope.update = {};
    $scope.update._id = $stateParams.id;

    Resumes.one({resume_id: $scope.update._id }).$promise.then(function(data){
      $scope.info = data.resume;
    });        

    $scope.$on('goUpdate', function(){
      if(!$scope.info.name) {
        $scope.errorMsg = '姓名不能为空';
        $scope.$saferApply();
        return;
      }
      $scope.info.resume_id = resume_id;
      $scope.info.updateTime = new Date().getTime();
      Resumes.update($scope.info).$promise.then(function(data) {
        if (data.status !== 1) return $scope.errorMsg = data.msg;
        Resumes.one({resume_id: resume_id}).$promise.then(function(data){
          $scope.normal = true;
          $scope.isExit = true;
          $scope.isForm = true;
          $scope.oper = '编辑';
          $scope.info = data.resume;
        }); 
        $('#operationBtn').removeClass('btn-warning').addClass('btn-primary');
        alert(data.msg);
      });
      $scope.$saferApply();
    });

  }])

  .controller('resumestateCtrl', ['$scope', 'Users', 'Resumes', '$cookies', function($scope, Users, Resumes, $cookies) {
    var userid = $cookies['_id'];

    Users.one({ user_id: userid }).$promise.then(function(data){
      Resumes.one({resume_id: data.data.user.resume}).$promise.then(function(data){
        $scope.status = data.resume.status;
        $scope.comment = data.resume.comment;
        $scope.createTime = data.resume.createTime;
        $scope.updateTime = data.resume.updateTime;
      });        
    });
  }])

  .controller('auditionassessCtrl', ['$scope', 'Users', 'Resumes', '$cookies', function($scope, Users, Resumes, $cookies) {
    var userid = $cookies['_id'];

    Resumes.all().$promise.then(function(data){
      $scope.info = data.resumes;
    });        

  }])



//
//== 密码修改
  .controller('passwordmodifyCtrl', ['$scope', 'Modifypassword', '$cookies', function($scope, Modifypassword, $cookies) {
    var userid = $cookies['_id'];
    
    $scope.modifyPassword = function() {
      if(!$scope.newPassword1 || !$scope.newPassword2 || !$scope.oldPassword) {
        $scope.errorMsg = '请完整填好信息！';
        return;
      }

      if($scope.newPassword1 != $scope.newPassword2) {
        $scope.errorMsg = '两次输入的密码不一致！';
        return;
      }
      var updatePwd = {
        user_id: userid,
        oldPassword: $scope.oldPassword,
        newPassword: $scope.newPassword1
      }
      Modifypassword.modify(updatePwd).$promise.then(function(data) {
        alert(data.msg);

        if(data.status == 1) {
          $scope.newPassword1 = $scope.newPassword2 = $scope.oldPassword = '';
        }
      });
    }
  }]);


