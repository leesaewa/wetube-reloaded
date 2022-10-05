import regeneratorRuntime from "regenerator-runtime";
import "../scss/style.scss";

//
// loading

// const loader = document.querySelector(".loading");
const body = document.querySelector("body");

window.addEventListener("load", () => {
  document.body.classList.remove("before-load");

  // window.addEventListener("load", () => {
  //   body.style.overflow = "hidden"; //로딩 중 스크롤 방지
  //   setTimeout(() => {
  //     //로딩속도 구현
  //     loader.style.opacity = "0";
  //     body.style.overflowY = "auto"; //스크롤 방지 해제
  //     setTimeout(() => {
  //       loader.style.display = "none";
  //     }, 400);
  //   }, 1500);
  // });

  // dark mode
  const darkTheme = document.querySelector(".theme-change a");
  const darkIcon = darkTheme.querySelector("i");

  darkTheme.addEventListener("click", () => {
    let colorMode = localStorage.getItem("colorMode");

    if (colorMode == "dark" && document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      darkIcon.innerText = "dark_mode";
      localStorage.setItem("colorMode", "light");
    } else {
      document.body.classList.add("dark-mode");
      darkIcon.innerText = "light_mode";
      localStorage.setItem("colorMode", "dark");
    }
  });

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
    document.body.removeChild(e.currentTarget);
  });
});
