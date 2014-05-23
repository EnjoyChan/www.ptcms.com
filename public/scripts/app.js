var app = angular.module('ptcms', [
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'ptcms.controllers',
  'ptcms.directives',
  'ptcms.services',
  'ptcms.filters'
]);


app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard',      { url: '/dashboard',      templateUrl: '../partials/dashboard.html',      controller: 'dashboardCtrl'       })
      .state('myprofile',      { url: '/myprofile',      templateUrl: '../partials/myprofile.html',      controller: 'myprofileCtrl'       })
      .state('grademanage',    { url: '/grademanage',    templateUrl: '../partials/grademanage.html',    controller: 'grademanageCtrl'     })
      .state('groupmanage',    { url: '/groupmanage',    templateUrl: '../partials/groupmanage.html',    controller: 'groupmanageCtrl'     })
      .state('classemanage',   { url: '/classemanage',   templateUrl: '../partials/classemanage.html',   controller: 'classemanageCtrl'    })
      .state('projectmanage',  { url: '/projectmanage',  templateUrl: '../partials/projectmanage.html',  controller: 'projectmanageCtrl'   })
      .state('passwordmodify', { url: '/passwordmodify', templateUrl: '../partials/passwordmodify.html', controller: 'passwordmodifyCtrl'  })
      .state('userslist',      { url: '/userslist',      templateUrl: '../partials/userslist.html',      controller: 'userslistCtrl'       })
      .state('usercreate',     { url: '/usercreate',     templateUrl: '../partials/usercreate.html',     controller: 'usercreateCtrl'      })
      .state('resumecheck',    { url: '/resumecheck',    templateUrl: '../partials/resumecheck.html',    controller: 'resumecheckCtrl'     })
      // .state('', { url: '/', templateUrl: '../partials/.html', controller: ''        })
      // .state('', { url: '/', templateUrl: '../partials/.html', controller: ''        })
      // .state('', { url: '/', templateUrl: '../partials/.html', controller: ''        })
      .state('mytasks',   { url: '/mytasks',   templateUrl: '../partials/mytasks.html',   controller: 'mytasksCtrl'          });
  }
]);

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
