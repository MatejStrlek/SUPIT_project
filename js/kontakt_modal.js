var modal = document.getElementById("myModal");
var kontakt = document.getElementById("kontakt");

if (!kontakt) {
  console.error("kontakt was not found");
} else {
  kontakt.onclick = function () {
      modal.style.display = "block";
  }
}

var closeBtn = document.getElementById("close_modal");
if (!closeBtn) {
  console.error("close_modal was not found");
} else {
    closeBtn.onclick = function () {
      modal.style.display = "none";
  }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
