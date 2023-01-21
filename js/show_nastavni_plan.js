window.onload = function () {
    var nastavni_plan = $("#nastavni_plan_hidden");
    var login_btn = $("#login_btn");
    var logout_btn = $("#logout_btn");

    if (localStorage.hasOwnProperty('token')) {
        nastavni_plan.show();
        login_btn.hide();
        logout_btn.show();
    } else {
        nastavni_plan.hide();
    }

    logout_btn.click(function () {
        localStorage.clear();
        location.reload();
    });
}