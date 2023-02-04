window.onload = () => {
    $('#message_register').hide();

    document.querySelector("#register_button").addEventListener("click", (e) => {
        e.preventDefault();

        const username = document.querySelector("#register_textbox_email").value;
        const password = document.querySelector("#register_textbox_pass").value;

        if (!username || !password) {
            $('#message_register').text("Korisničko ime i lozinka su obavezna polja").show().delay(3000).hide(300);
            return;
        }

        fetch("https://www.fulek.com/data/api/user/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            .then((response) => response.json())
            .then((podaci) => {
                /*console.log(podaci);*/
                if (podaci.isSuccess) {
                    /*console.log(podaci.data.token);*/
                    $('#message_register').text("Uspješna registracija, redirect na stranicu prijave za 3, 2, 1...").show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("login_page.html");
                    }, 3000);
                } else {
                    console.log(podaci.errorMessages[0]);
                    $('#message_register').text(podaci.errorMessages[0]).show().delay(3000).hide(300);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
