angular.module('ptcms.directives', [])

//
//== 头部
  .directive('logout', ['$cookieStore', function($cookieStore) {
    'use strict';

    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        // $cookieStore.remove('username');
        // $cookieStore.remove('password');
      });
    };

    return {
      restrict: 'AE',
      link: link
    }

  }])

//
//== 侧边栏

// 展开菜单栏
  .directive('openSubmenus', [function() {
    'use strict';

    var link = function(scope, element, attrs) {
      element.on('click', function() {

        if ($(this).parent().hasClass('open')) {
          $(this).siblings('.submenus').slideUp(300);
          $(this).parent().removeClass('open');
        } else {
          $(this).siblings('.submenus').slideDown(300);
          $(this).parent().addClass('open').siblings('li').removeClass('open').children('.submenus').slideUp(300);
        }
      });
    };
    return {
      restrict: 'AE',
      link: link
    };
  }])

// 选择菜单
  .directive('openPage', [function() {
    'use strict';

    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 'slow');

        $('.a-level').removeClass('active');
        $(this).closest('.a-level').addClass('active');
      });
    };
    return {
      restrict: 'AE',
      link: link
    };
  }])

// 班级管理
  .directive('addClasse', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('addClasse');
      });
    };
    return {
      restrict: 'AE',
      link: link
    };
  }])
  .directive('deleteClasse', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('deleteClasse', element.data('number'));
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('goModifyClasse', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('goModifyClasse', scope.classe);
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('modifyClasse', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('modifyClasse');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  //
  .directive('revokeModifyClasse', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('revokeModifyClasse');
      });
    };
    return { restrict: 'AE', link: link };
  }]);

