const commentForm = document.querySelector(".section-comment--form");
const commentText = document.querySelector("#section-comment--content");
const commentButton = document.querySelector(".section-comment--create-btn");

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
