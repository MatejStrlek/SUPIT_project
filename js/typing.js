$(async () =>{
    const timer = ms => new Promise(res => setTimeout(res, ms));
    const data = "Budi izvrstan u onom što vidiš!$voliš!?ZAISKRI.";
    var line = $("#typing-p-first");

    for (let index = 0; index < data.length; index++) {
        if(data[index] == '?'){
            line.css({'animation': 'none'});
            line = $("#typing-p-second");
            line.css({'animation': 'blinkCursor 0.8s infinite'});
        }else if(data[index] == '$'){
            await timer(250);
            line.text("Budi izvrstan u onom što ");
        }else{
            line.append(data[index]);
        }
        await timer(300);
    }
});