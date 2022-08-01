const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

//fake comment
const addComment = (text, id) => {
  const videoComments = document.querySelector(".comment-write-container ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  // newComment.className = "comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "close";

  newComment.appendChild(span);
  newComment.appendChild(deleteBtn);
  deleteBtn.className = "delete-comment material-icons";
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

// delete
// const deleteComment = async (e) => {
//   e.preventDefault();
//   const textarea = form.querySelector("textarea");
//   const text = textarea.value;
//   const videoId = videoContainer.dataset.id;

//   if (text === "") {
//     return;
//   }

//   const response = await fetch(`/api/videos/${videoId}/comment`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text }),
//   });

//   if (response.status === 201) {
//     textarea.value = "";
//     const { newCommentId } = await response.json();
//     addComment(text, newCommentId);
//   }
// };

if (form) {
  form.addEventListener("submit", handleSubmit);
}

// r.delete("/", deleteComment);
