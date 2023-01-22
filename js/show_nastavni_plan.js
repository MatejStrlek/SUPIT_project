window.onload = function () {
    var nastavni_plan = $("#nastavni_plan_hidden");
    var login_btn = $("#login_btn");
    var logout_btn = $("#logout_btn");
    var username_text = $("#span_show_username");

    if (localStorage.hasOwnProperty('token')) {
        nastavni_plan.show();
        login_btn.hide();
        logout_btn.show();
        username_text.text(localStorage.getItem('username')).css("color", "rgb(50, 187, 233)");
    }

    logout_btn.click(function () {
        localStorage.clear();
        location.reload();
        location.replace("index.html");
    });
}