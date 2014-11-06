$(function() {
    $('#pwdBox').modal('show');

    $('#pwd-form').submit(function(evt) {
        evt.preventDefault();
        $.get('http://api.xingwu.me/proposal/get_letter', {password:md5($('#textField').val())}, function(rst){
            if (rst && rst.ret == 0) {
                $('#letter').html('<p>' + rst.data + '</p>')
                $('#pwdBox').modal('hide');
            } else {
                $('#myModalLabel').css({'color':'red'}).text('您输入的密码有误，请重试');
            }
        });
    });
})
