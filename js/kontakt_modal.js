const modal = document.getElementById("myModal");
const kontakt = document.getElementById("kontakt");
const closeBtn = document.getElementById("close_btn");

kontakt
  ? kontakt.onclick = () => modal.style.display = "block"
  : console.error("kontakt was not found!");

closeBtn
  ? closeBtn.onclick = () => modal.style.display = "none"
  : console.error("close_btn was not found!");

window.onclick = (event) => {
  if (event.target == modal)
    modal.style.display = "none"
}
