window.onload = function () {
    textSuccess = "Uspješna prijava :) Na početnu stranicu za 3, 2, 1...";
    $('#message_login').hide();

    const form = {
        username: document.querySelector("#login_textbox_email"),
        password: document.querySelector("#login_textbox_pass"),
        submit: document.querySelector("#login_button"),
    };

    let button = form.submit.addEventListener("click", (e) => {
        const login = "https://www.fulek.com/data/api/user/login";
        e.preventDefault();
        fetch(login, {
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
                    /*console.log(podaci.errorMessages[0]);*/
                    $('#message_login').text(podaci.errorMessages[0]).show().delay(3000).hide(300);
                } else {
                    localStorage.setItem('token', podaci['token']);
                    localStorage.setItem('username', podaci['username']);
                    /*console.log(podaci.data.token);*/
                    $('#message_login').text(textSuccess).show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("index.html");
                    }, 3000);                    
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
