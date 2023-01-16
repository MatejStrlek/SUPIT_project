window.onload = function() {
    textSuccess = "Uspješna registracija, redirect na stranicu prijave za 3, 2, 1...";
    $('#message_register').hide();

    const form = {
        username: document.querySelector("#register_textbox_email"),
        password: document.querySelector("#register_textbox_pass"),
        submit: document.querySelector("#register_button"),
    };

    let button = form.submit.addEventListener("click", (e) => {
        const register = "https://www.fulek.com/data/api/user/register";
        e.preventDefault();
        fetch(register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username.value,
                password: form.password.value,
            }),
        })
            .then((response) => response.json())
            .then((podaci) => {
                console.log(podaci);
                if (!podaci.isSuccess) {
                    console.log(podaci.errorMessages[0]);
                    $('#message_register').text(podaci.errorMessages[0]).show().delay(3000).hide(300);
                } else {
                    /*console.log(podaci.data.token);*/
                    $('#message_register').text(textSuccess).show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("login_page.html");
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
