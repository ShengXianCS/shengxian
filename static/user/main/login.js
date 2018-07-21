function submitForm() {
    var name=$('input[name=name]');
    if (name.val().trim()==''){
        name.parent().addClass('has-error');
        name.parent().next().show();
        return
    } else {
        name.parent().removeClass('has-error');
    }

    var passwd=$('input[name=passwd]');
    if (passwd.val().trim()==''){
        passwd.parent().addClass('has-error');
        passwd.parent().next().show();
        return
    } else {
        passwd.parent().removeClass('has-error');
    }
    $('form').submit()
}


$(function () {
    $('input').blur(function () {
        if ($(this).val().trim()==''){
            $(this).parent().addClass('has-error')
            $(this).parent().next().show();
            return
        } else {
            $(this).parent().removeClass('has-error')
            $(this).parent().next().hide()
        }
    })
})