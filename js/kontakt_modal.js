const modal = document.getElementById("myModal");
const kontakt = document.getElementById("kontakt");
const closeBtn = document.getElementById("close_btn");

if (!modal){
  console.log("modal was not found!")
}

if (!kontakt) {
  console.error("kontakt was not found!");
} else {
  kontakt.onclick = () => {
      modal.style.display = "block";
  }
}

if (!closeBtn) {
  console.error("close_btn was not found!");
} else {
    closeBtn.onclick = function () {
      modal.style.display = "none";
  }
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
