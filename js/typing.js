var i = 0;
var j = 0;
var txt1 = 'Budi izvrstan u onom što voliš.';
var txt2 = 'ZAISKRI.'; /* The text */
var speed = 150; /* The speed/duration of the effect in milliseconds */

function secondTypeWriter(){

    if(j == 0){
        document.getElementById("typing-p").innerHTML += "<br/>";
    }
       
    if (j < txt2.length) {
        document.getElementById("typing-p").innerHTML += txt2.charAt(j);
        j++;
        setTimeout(typeWriter, speed);
    }
}

function typeWriter() {
    if (i < txt1.length) {
        document.getElementById("typing-p").innerHTML += txt1.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else{
        secondTypeWriter();
    }
}

window.onload = function() {
    typeWriter();
}