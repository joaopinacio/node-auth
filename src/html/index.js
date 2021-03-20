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

        let data = {
            "dsLogin": $('#dsLogin').val(),
            "dsPassword": $('#dsPassword').val(),
        };

        $.ajax({
            type: "POST",
            url: window.location.origin + "/api/auth/login",
            data: data,
            success: function (response) {
                console.log(response);
            }
        }).always(function (response){
            $("#btnSignIn").removeClass('btn-loading');
        });
    });

    $("#btnSignUp").click(function (e) {
        e.preventDefault();
        $("#btnSignUp").addClass('btn-loading');

        setTimeout(() => {
            $("#btnSignUp").removeClass('btn-loading');
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