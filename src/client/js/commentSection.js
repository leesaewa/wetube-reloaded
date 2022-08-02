// import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete-comment");

//
//fake comment
//
const addComment = (text, id, avatar, name, socialCheck, owner, createdAt) => {
  const videoComments = document.querySelector(".comment-output-container");
  const newComment = document.createElement("div");
  newComment.className = "comment-output-inner";
  newComment.dataset.id = id;

  const link = document.createElement("a");
  link.href = `/users/${owner}`;
  newComment.appendChild(link);

  // avatar(user profile image)
  const avatarDiv = document.createElement("div");
  avatarDiv.className = "comment-avatar";
  link.appendChild(avatarDiv);

  const profileDiv = document.createElement("div");
  profileDiv.className = "profile-image";
  avatarDiv.appendChild(profileDiv);

  if (socialCheck === false && avatar) {
    const img = document.createElement("img");
    img.className = "header__avatar";
    img.crossOrigin = true;
    profileDiv.appendChild(img);
    img.src = "/" + avatar;
  } else if (socialCheck === true && avatar) {
    const img = document.createElement("img");
    img.className = "header__avatar";
    img.crossOrigin = true;
    profileDiv.appendChild(img);
    img.src = "" + avatar;
  } else if (!avatar && socialCheck === false) {
    const noImg = document.createElement("p");
    noImg.className = "header__avatar no-img";
    profileDiv.appendChild(noImg);
  }

  // user profile info
  const infoDiv = document.createElement("div");
  infoDiv.className = "comment-info";
  avatarDiv.appendChild(infoDiv);

  const createDate = document.createElement("span");
  createDate.className = "comment-date";
  date = new Date(createdAt);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const todayYear = date.getFullYear();
  const todayMonth = String(date.getMonth() + 1);
  const todayDate = String(date.getDate());
  createDate.innerText = `${todayYear}.${todayMonth}.${todayDate}.${hours}:${minutes}:${seconds}`;

  infoDiv.appendChild(createDate);

  const userName = document.createElement("p");
  userName.innerText = name;
  infoDiv.prepend(userName);

  // comment content
  const commentCont = document.createElement("p");
  commentCont.innerText = ` ${text}`;
  commentCont.className = "comment-cont";
  newComment.appendChild(commentCont);

  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "close";
  deleteBtn.className = "delete-comment material-icons";
  deleteBtn.addEventListener("click", handleDelete);
  newComment.appendChild(deleteBtn);

  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const {
      newCommentId,
      ownerAvatar,
      ownerName,
      socialCheck,
      owner,
      createdAt,
    } = await response.json();
    addComment(
      text,
      newCommentId,
      ownerAvatar,
      ownerName,
      socialCheck,
      owner,
      createdAt
    );
    console.log(createdAt);
  }
};

// delete

const handleDelete = async (event) => {
  const commentCont = event.target.parentNode;
  console.log(commentCont);
  const commentId = commentCont.dataset.id;
  console.log(commentId);

  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });

  console.log("통과");
  if (response.status === 200) {
    console.log("delete");
    commentCont.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtns) {
  deleteBtns.forEach((deleteBtns) => {
    deleteBtns.addEventListener("click", handleDelete);
  });
}
