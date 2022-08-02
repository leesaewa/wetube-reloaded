// import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete-comment");

//fake comment
const addComment = (text, id, avatar, name, socialCheck) => {
  const videoComments = document.querySelector(".comment-write-container");
  const newComment = document.createElement("div");
  newComment.dataset.id = id;
  newComment.className = "comment-output-inner";

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "comment-avatar";
  newComment.appendChild(avatarDiv);

  if (socialCheck === false && avatar) {
    const img = document.createElement("img");
    img.className = "header__avatar";
    img.src = "/" + avatar;
    img.crossOrigin = true;
    avatarDiv.appendChild(img);
  } else if (socialCheck === true && avatar) {
    const img = document.createElement("img");
    img.className = "header__avatar";
    img.src = "" + avatar;
    img.crossOrigin = true;
    avatarDiv.appendChild(img);
  } else if (!avatar && socialCheck === false) {
    const noImg = document.createElement("p");
    noImg.className = "header__avatar no-img";
    avatarDiv.appendChild(noImg);
  }

  // test

  // test

  const userName = document.createElement("span");
  userName.innerText = name;
  avatarDiv.appendChild(userName);

  const commentCont = document.createElement("p");
  commentCont.innerText = ` ${text}`;
  newComment.appendChild(commentCont);

  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "close";
  newComment.appendChild(deleteBtn);
  deleteBtn.className = "delete-comment material-icons";

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
    const { newCommentId, ownerAvatar, ownerName, socialCheck } =
      await response.json();
    addComment(text, newCommentId, ownerAvatar, ownerName, socialCheck);
    console.log(socialCheck, ownerName, ownerAvatar);
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
