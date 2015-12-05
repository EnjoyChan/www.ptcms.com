angular.module('cms.directives', [])

//
//== 通用
  .directive('toggleDetail', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      var single = {};

      single = element.closest('.single');

      element.on('click', function(e) {
        if (single.hasClass('open')) {
          single.removeClass('open');
          element.html('详&nbsp;情');
          angular.element('.detail', single).slideUp(200);
        } else {
          single.addClass('open');
          element.html('关&nbsp;闭');
          angular.element('.detail', single).slideDown(200);
        }
      });
    };
    return { restrict: 'AE', link: link };
  }])

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

// 展开菜单栏子项
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
        $('.page-sidebar').removeClass('open');
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

// 小组管理
  .directive('changeState', [function() {
    'use strict';
    var link = function(scope, element) {
      element.on('click', function(e) {
        var data = {};
        data.state = $(this).text();
        data.id = $(this).attr('data')
        scope.$emit('changeState', data);
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('addGroup', [function() {
    'use strict';
    var link = function(scope, element) {
      element.on('click', function(e) {
        scope.$emit('addGroup');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('goUpdateGroup', [function() {
    'use strict';
    var link = function(scope, element) {
      element.on('click', function(e) {
        scope.$emit('goUpdateGroup', scope.group);
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('deleteGroup', [function() {
    'use strict';
    var link = function(scope, element) {
      element.on('click', function(e) {
        scope.$emit('deleteGroup', scope.group);
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('updateGroup', [function() {
    'use strict';
    var link = function(scope, element) {
      element.on('click', function(e) {
        scope.$emit('updateGroup');
      });
    };
    return { restrict: 'AE', link: link };
  }])

  .directive('getFile', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('change', function(e) {
        var data = $(this).val()
        scope.$emit('getFile', data);
      });
    };
    return { restrict: 'AE', link: link };
  }])


// 任务管理
  .directive('changeStatus', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        var data = {};
        data.status = $(this).text();
        data.id = $(this).parent().attr('data');
        scope.$emit('changeStatus', data);
      });
    };
    return { restrict: 'AE', link: link };
  }])

// 成员列表

// 新增成员
  .directive('addDoc', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('addDoc');
      });
    };
    return { restrict: 'AE', link: link };
  }])

// 个人信息
  .directive('goEdit', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('goInfoEdit');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('revokeEdit', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('revokeEdit');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('updateEdit', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('updateEdit');
      });
    };
    return { restrict: 'AE', link: link };
  }])

// 管理员编辑
  .directive('deleteDoc', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        if(confirm('确定删除？')) {
          var data = $(this).attr('data');
          scope.$emit('deleteDoc', data);
        }
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('submitBroadcast', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        if(confirm('确定发布？')){
          scope.$emit('submitBroadcast');         
        }
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('closeModal', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        $('#myModal').hide();
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('showModal', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        $('#myModal').show();
        scope.$emit('showModal');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('addTag', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('addTag');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('deleteTag', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        var data = $(this).attr('data');
        scope.$emit('deleteTag', data);
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('adminRevok', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        $('#operationBtn').removeClass('btn-warning').addClass('btn-primary');
        scope.$emit('revokeEdit');
      });
    };
    return { restrict: 'AE', link: link };
  }])
  .directive('adminEdit', [function() {
    'use strict';
    var link = function(scope, element, attrs) {
      element.on('click', function(e) {
        var oper = scope.oper;
        if(oper == '编辑') {
          $(this).removeClass('btn-primary').addClass('btn-warning');
          scope.$emit('goInfoEdit');
        }else if(oper == '保存'){
          scope.$emit('save');
        }else{
          scope.$emit('goUpdate');
        }

      });
    };
    return { restrict: 'AE', link: link };
  }]);






