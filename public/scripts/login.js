(function(global, $) {
  $('.signup').on('click', function() {
    var account,
        password,
        data;

    account = $('[name=account]').val() || '';
    password = $('[name=password]').val() || '';
    data = { account: account, password: password };

    if (!account) {
      $('[name=account]').focus();
      $('.msg').css('visibility', 'visible').children('span').text('账号不能为空');
      return;
    }

    if (!password) {
      $('[name=password]').focus();
      $('.msg').css('visibility', 'visible').children('span').text('密码不能为空');
      return;
    }

    $.post('/login', data, function(resData) {
      if (resData.status === 1) {
        window.location.href = 'http://localhost:3000/index';
      } else {
        $('.msg').css('visibility', 'visible').children('span').text(resData.msg);
      }
    });

  });
})(this, jQuery);