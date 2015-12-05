var app = angular.module('cms', [
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'cms.controllers',
  'cms.directives',
  'cms.services',
  'cms.filters'
]);

// 单页面，路由控制
app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('groupdetail',    { url: '/groupdetail/:id',  templateUrl: '../partials/groupdetail.html',    controller: 'groupdetailCtrl'})
      .state('userdetail',     { url: '/userdetail/:id',   templateUrl: '../partials/userdetail.html',      controller: 'userdetailCtrl'})
      .state('projectdetail',  { url: '/projectdetail/:id',templateUrl: '../partials/projectdetail.html',controller: 'projectdetailCtrl'})
      .state('resumedetail',  { url: '/resumedetail/:id',templateUrl: '../partials/resumedetail.html',controller: 'resumedetailCtrl'})
      .state('feedback',       { url: '/feedback/:id&:name',templateUrl: '../partials/feedback.html',controller: 'feedbackCtrl'})
      .state('dashboard',      { url: '/dashboard',      templateUrl: '../partials/dashboard.html',      controller: 'dashboardCtrl'       })
      .state('myprofile',      { url: '/myprofile',      templateUrl: '../partials/myprofile.html',      controller: 'myprofileCtrl'       })
      .state('grademanage',    { url: '/grademanage',    templateUrl: '../partials/grademanage.html',    controller: 'grademanageCtrl'     })
      .state('grouplist',    { url: '/grouplist',    templateUrl: '../partials/grouplist.html',    controller: 'grouplistCtrl'     })
      .state('groupcreate',    { url: '/groupcreate',    templateUrl: '../partials/groupcreate.html',    controller: 'groupcreateCtrl'     })
      .state('classemanage',   { url: '/classemanage',   templateUrl: '../partials/classemanage.html',   controller: 'classemanageCtrl'    })
      .state('projectlist',  { url: '/projectlist',  templateUrl: '../partials/projectlist.html',  controller: 'projectlistCtrl'   })
      .state('projectcreate',  { url: '/projectcreate',  templateUrl: '../partials/projectcreate.html',  controller: 'projectcreateCtrl'   })
      .state('passwordmodify', { url: '/passwordmodify', templateUrl: '../partials/passwordmodify.html', controller: 'passwordmodifyCtrl'  })
      .state('userslist',      { url: '/userslist',      templateUrl: '../partials/userslist.html',      controller: 'userslistCtrl'       })
      .state('usercreate',     { url: '/usercreate',     templateUrl: '../partials/usercreate.html',     controller: 'usercreateCtrl'      })
      .state('resumecheck',    { url: '/resumecheck',    templateUrl: '../partials/resumecheck.html',    controller: 'resumecheckCtrl'     })
      .state('broadcastlist',    { url: '/broadcastlist',    templateUrl: '../partials/broadcastlist.html',    controller: 'broadcastlistCtrl'     })
      .state('broadcastcreate',    { url: '/broadcastcreate',    templateUrl: '../partials/broadcastcreate.html',    controller: 'broadcastcreateCtrl'     })
      .state('taskcreate',     { url: '/taskcreate',     templateUrl: '../partials/taskcreate.html',     controller: 'taskcreateCtrl'      })
      .state('mytasks',   { url: '/mytasks',   templateUrl: '../partials/mytasks.html',   controller: 'mytasksCtrl'          })
      .state('teaminfo',   { url: '/teaminfo',   templateUrl: '../partials/teaminfo.html',   controller: 'teaminfoCtrl'          })
      .state('teamfrature',   { url: '/teamfrature',   templateUrl: '../partials/teamfrature.html',   controller: 'teamfratureCtrl'          })
      .state('teamcontact',   { url: '/teamcontact',   templateUrl: '../partials/teamcontact.html',   controller: 'teamcontactCtrl'          })
      .state('mygroups',   { url: '/mygroups',   templateUrl: '../partials/mygroups.html',   controller: 'mygroupsCtrl'          })
      .state('myresume',   { url: '/myresume',   templateUrl: '../partials/myresume.html',   controller: 'myresumeCtrl'          })
      .state('resumestate',   { url: '/resumestate',   templateUrl: '../partials/resumestate.html',   controller: 'resumestateCtrl'          })
      .state('auditionassess',   { url: '/auditionassess',   templateUrl: '../partials/auditionassess.html',   controller: 'auditionassessCtrl'          })
      .state('tasklist',   { url: '/tasklist',   templateUrl: '../partials/tasklist.html',   controller: 'tasklistCtrl'          })
      .state('groupprojects',   { url: '/groupprojects',   templateUrl: '../partials/groupprojects.html',   controller: 'groupprojectsCtrl'          })
      .state('groupmembers',   { url: '/groupmembers',   templateUrl: '../partials/groupmembers.html',   controller: 'groupmembersCtrl'          })
      .state('taskdetail',  { url: '/taskdetail/:id',templateUrl: '../partials/taskdetail.html',controller: 'taskdetailCtrl'})
      ;
  }
]);
http://192.168.2.9:3000/login
app.run(['$rootScope', function($rootScope) {
  $rootScope.$saferApply = function (exp) {
    if (!this.$$phase) {
      this.$apply(exp);
    } else {
      try {
        this.$eval(exp);
      } catch (ex) {
        $exceptionHandler(ex);
      } finally {
        this.$digest();
      }
    }
  };
}]);
