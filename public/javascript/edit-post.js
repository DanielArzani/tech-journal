const formEditPost = document.querySelector(".section-edit_post--form");
const postTitle = document.querySelector("#section-edit_post--title");
const postContent = document.querySelector("#section-edit_post--content");
const editPostBtn = document.querySelector(".edit-post--update-btn");

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
