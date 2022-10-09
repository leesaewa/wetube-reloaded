import regeneratorRuntime from "regenerator-runtime";
import "../scss/style.scss";

//
// loading

// const loader = document.querySelector(".loading");
const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.remove("before-load");

  // dark mode
  const darkTheme = document.querySelector(".theme-change a");
  const darkIcon = darkTheme.querySelector("i");

  function darkThemeClick() {
    darkTheme.addEventListener("click", function () {
      if (!body.classList.contains("dark-mode")) {
        body.classList.add("dark-mode");
        darkIcon.innerText = "light_mode";
        localStorage.setItem("colorMode", "light_mode");
      } else {
        body.classList.remove("dark-mode");
        darkIcon.innerText = "dark_mode";
        localStorage.setItem("colorMode", "dark_mode");
      }
    });
  }

  darkThemeClick();

  const colorMode = localStorage.getItem("colorMode"); // "colorMode" 아이템 값 불러오기

  //만약 colorMode가 dark_mode(테마는 light)라면 아이콘을 dark_mode(달)로 바꿈.
  if (colorMode === "dark_mode") {
    body.classList.remove("dark-mode");
    darkIcon.innerText = "dark_mode";
  } else {
    // colorMode가 light_mode(테마는 dark)라면 아이콘을 light_mode(해) 바꿈.
    body.classList.add("dark-mode");
    darkIcon.innerText = "light_mode";
  }

  //header
  let headerScroll = document.querySelector("header");
  let headerHeight = headerScroll.offsetHeight;

  document.onscroll = function () {
    let windowTop = window.scrollY;
    if (windowTop >= headerHeight) {
      headerScroll.classList.add("scroll");
    } else {
      headerScroll.classList.remove("scroll");
    }
  };

  // nav
  const loginBtn = document.querySelector(".login");
  const dropMenuCont = document.querySelector(".drop-menu");
  const overlay = document.querySelector(".overlay");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      dropMenuCont.classList.toggle("open");
      loginBtn.classList.toggle("open");
      overlay.classList.toggle("open");
      body.style.overflow = "hidden";
      if (!loginBtn.classList.contains("open")) {
        body.style.overflowY = "auto";
      }
    });
  }
  overlay.addEventListener("click", () => {
    dropMenuCont.classList.remove("open");
    loginBtn.classList.remove("open");
    overlay.classList.remove("open");
    body.style.overflowY = "auto";
  });

  //
  // file preview
  //
  function filePreview(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      //이미지가 로드되면 images에 덮어쓰기
      reader.onload = (e) => {
        const previewImage = document.getElementById("images");
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  // input file에 change 이벤트 부여
  const fileImage = document.getElementById("avatar");
  const thumbInput = document.querySelector(".thumb-input");
  if (fileImage) {
    fileImage.addEventListener("change", (e) => {
      filePreview(e.target);
    });
  }

  if (thumbInput) {
    const thumb = document.querySelector(".thumb");
    thumbInput.addEventListener("change", (e) => {
      if (!thumb.classList.contains("thumb-check")) {
        const img = document.createElement("img");
        img.id = "images";
        thumb.appendChild(img);
        thumb.classList.add("thumb-check");
        filePreview(e.target);
      } else {
        filePreview(e.target);
      }
    });
  }

  //
  // input file change
  const fileInput = document.querySelector(".input-file");
  const labelBtn = document.querySelector(".input-file-trigger");
  const previewReturn = document.querySelector(".file-return");

  if (fileInput) {
    labelBtn.addEventListener("click", function (event) {
      fileInput.focus();
      return false;
    });

    fileInput.addEventListener("change", function (event) {
      previewReturn.value = this.value;
    });
  }

  document.querySelector(".loading").addEventListener("transitionend", (e) => {
    body.removeChild(e.currentTarget);
  });
});
