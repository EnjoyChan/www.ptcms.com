(function(global, $) {
  // enter触发提交表单
  $('body').keydown(function(event) {
    if(event.keyCode == '13') {
      $('.logIn').click();
    }
  });
  
  // 点击登录按钮
  $('.logIn').on('click', function() {
    var account,
        password,
        data;

    account = $('[name=account]').val() || '';
    password = $('[name=password]').val() || '';
    data = { account: account, password: password };

    if (!account) {
      $('[name=account]').focus();
      $('.msg').show().children('span').text('账号不能为空');
      return;
    }

    if (!password) {
      $('[name=password]').focus();
      $('.msg').show().children('span').text('密码不能为空');
      return;
    }

    $.post('/login', data, function(resData) {
      if (resData.status === 1) {
        window.location.href = '/index';
      } else {
        $('.msg').show().children('span').text(resData.msg);
      }
    });

  });
})(this, jQuery);