const commentForm = document.querySelector(".add-comment-form");
const commentText = document.querySelector("#comment-input");
const commentButton = document.querySelector(".btn-add-comment");

const addComment = async function (e) {
  e.preventDefault();

  const content = commentText.value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      post_id: id,
    }),
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText);
  }
};

commentForm.addEventListener("submit", addComment);
