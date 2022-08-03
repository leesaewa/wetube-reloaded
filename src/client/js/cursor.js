//
// cursor custom
//
let mouseCursor = document.querySelector(".cursor");
let link = document.querySelectorAll("a");

window.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY + "px";
}

link.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-cursor");
    link.classList.add("hover-link");
  });

  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-cursor");
    link.classList.remove("hover-link");
  });
});
