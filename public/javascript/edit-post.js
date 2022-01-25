const formEditPost = document.querySelector(".edit-post-form");
const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#edit-post-textarea");
const editPostBtn = document.querySelector(".edit-post-btn");

const editPost = async function (e) {
  e.preventDefault();

  const title = postTitle.value.trim();
  const content_body = postContent.value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content_body,
    }),
  });
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
};

formEditPost.addEventListener("submit", editPost);
