window.onload = () => {
    $('#message_login').hide();

    document.querySelector("#login_button").addEventListener("click", (e) => {
        e.preventDefault();
        fetch("https://www.fulek.com/data/api/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: document.querySelector("#login_textbox_email").value,
                    password: document.querySelector("#login_textbox_pass").value,
                })
            })
            .then((response) => response.json())
            .then((podaci) => {
                /*console.log(podaci);*/
                if (podaci.isSuccess) {
                    localStorage.setItem('token', podaci.data.token);
                    localStorage.setItem('username', podaci.data.username);
                    /*console.log(podaci.data.token);*/
                    $('#message_login').text("Uspješna prijava :) Na početnu stranicu za 3, 2, 1...").show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("index.html");
                    }, 3000);
                }
                else {
                    /*console.log(podaci.errorMessages[0]);*/
                    $('#message_login').text(podaci.errorMessages[0]).show().delay(3000).hide(300);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
