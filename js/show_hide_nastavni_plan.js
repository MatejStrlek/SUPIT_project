window.onload = () => {
    
    if (localStorage.hasOwnProperty('token')) {
        $("#nastavni_plan_hidden").show();
        $("#login_btn").hide();
        $("#logout_btn").show();
        $("#span_show_username").text(localStorage.getItem('username')).css("color", "rgb(50, 187, 233)");
    }

    $("#logout_btn").click(() => {
        /*console.log('stiscem');*/
        localStorage.clear();
        location.reload();
        location.replace("index.html");
    });
}