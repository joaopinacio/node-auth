$(document).ready(function () {
    $('.field input').focusin(function (e) { 
        e.preventDefault();
        $(this).parent().addClass('focus-field');
    });

    $('.field input').focusout(function (e) { 
        e.preventDefault();
        $(this).parent().removeClass('focus-field');
    });

    $("#btnSignIn").click(function (e) {
        e.preventDefault();
        $("#btnSignIn").addClass('btn-loading');
        $("#btnSignIn").attr('disabled', '');

        setTimeout(() => {
            $("#btnSignIn").removeClass('btn-loading');
            $("#btnSignIn").removeAttr('disabled', '');
        }, 3000);
    });

    $("#btnSignUp").click(function (e) {
        e.preventDefault();
        $("#btnSignUp").addClass('btn-loading');
        $("#btnSignUp").attr('disabled', '');

        setTimeout(() => {
            $("#btnSignUp").removeClass('btn-loading');
            $("#btnSignUp").removeAttr('disabled', '');
        }, 3000);
    });

    $('#btnSignInPanel').click(function (e) {
        e.preventDefault();
        $('.container').removeClass('sign-up-mode');
    });

    $('#btnSignUpPanel').click(function (e) {
        e.preventDefault();
        $('.container').addClass('sign-up-mode');
    });
});