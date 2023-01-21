window.onload = function () {
    var nastavni_plan = $("#nastavni_plan_hidden");

    if (localStorage.hasOwnProperty('token')) {
        nastavni_plan.show();
    } else {
        nastavni_plan.hide();
    }
}