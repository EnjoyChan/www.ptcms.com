(function(global, $) {
  // enter触发提交表单
  $('body').keydown(function(event) {
    if(event.keyCode == '13') {
      $('.signup').click();
    }
  });
  
  // 点击注册按钮
  $('.signup').on('click', function() {
    var account,
        password,
        confirm,
        data;

    account = $('[name=account]').val() || '';
    password = $('[name=password]').val() || '';
    confirm = $('[name=confirm]').val() || '';
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

    if(!confirm) {
      $('[name=confirm]').focus();
      $('.msg').show().children('span').text('请再次填写密码');
      return;
    }

    if(password != confirm) {
      $('.msg').show().children('span').text('两次填写的密码不一致');
      return;
    }

    $.post('/signup', data, function(resData) {
      if (resData.status === 1) {
        window.location.href = 'http://localhost:3000/index';
      } else {
        $('.msg').show().children('span').text(resData.msg);
      }
    });

  });
})(this, jQuery);