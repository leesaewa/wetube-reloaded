//
// cursor custom
//
let mouseCursor = document.querySelector(".cursor");
let link = document.querySelectorAll("a");
let hoverLink = document.querySelectorAll(".hover-link");

window.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY + "px";
}

link.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-cursor");
  });

  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-cursor");
  });
});
hoverLink.forEach((hoverLink) => {
  hoverLink.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-cursor");
  });
  hoverLink.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-cursor");
  });
});
