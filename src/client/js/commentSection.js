// import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete-comment");

//
//fake comment
//
const addComment = (text, id, avatar, name, socialCheck, owner, createdAt) => {
  const avatarClass = "avatar-img";
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
    img.className = avatarClass;
    img.crossOrigin = true;
    profileDiv.appendChild(img);
    img.src = avatar;
  } else if (socialCheck === true && avatar) {
    const img = document.createElement("img");
    img.className = avatarClass;
    img.crossOrigin = true;
    profileDiv.appendChild(img);
    img.src = avatar;
  } else if (!avatar && socialCheck === false) {
    const noImg = document.createElement("p");
    noImg.className = avatarClass + " no-img";
    profileDiv.appendChild(noImg);
  }

  // user profile info
  const infoDiv = document.createElement("div");
  infoDiv.className = "comment-info";
  avatarDiv.appendChild(infoDiv);

  const createDate = document.createElement("span");
  createDate.className = "comment-date";
  const dateNew = new Date(createdAt);
  createDate.innerText = `${dateNew.getFullYear()}년 ${
    dateNew.getMonth() + 1
  }월 ${dateNew.getDate()}일 ${dateNew.getHours()}시 ${dateNew.getMinutes()}분 ${dateNew.getSeconds()}초`;

  infoDiv.appendChild(createDate);

  const userName = document.createElement("p");
  userName.innerText = name;
  infoDiv.appendChild(userName);

  // comment content
  const commentCont = document.createElement("p");
  commentCont.innerText = ` ${text}`;
  commentCont.className = "comment-cont";
  newComment.appendChild(commentCont);

  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "close";
  deleteBtn.className = "delete-comment material-icons hover-link";
  deleteBtn.addEventListener("click", handleDelete);
  newComment.appendChild(deleteBtn);

  videoComments.appendChild(newComment);
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
  }
};

// delete

const handleDelete = async (event) => {
  const commentCont = event.target.parentNode;
  const commentId = commentCont.dataset.id;

  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });

  if (response.status === 200) {
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
