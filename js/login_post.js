window.onload = function() {
    $('#error_login').hide();

    const form = {
        username: document.querySelector("#login_textbox_email"),
        password: document.querySelector("#register_textbox_pass"),
        submit: document.querySelector("#login_button"),
        messages: document.getElementById("form-messages"),
    };

    let button = form.submit.addEventListener("click", (e) => {
        e.preventDefault();
        const login = "https://www.fulek.com/data/api/user/login";

        fetch(login, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username.value,
                password: form.password.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // code here //
                if (data.errorMessages != null) {
                    console.log(data.errorMessages[0]); /*displays error message*/
                    $('#error_login').text(data.errorMessages[0]).show();
                } else {
                    window.open(
                        "novosti.html"
                    ); /*opens the target page while Id & password matches*/
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
