const formCreatePost = document.querySelector(".create-post-form");
const postTitle = document.querySelector("#post-title");
const newPostContent = document.querySelector("#create-post-textarea");
const createPostBtn = document.querySelector(".create-post-btn");

const createPost = async function (e) {
  e.preventDefault();

  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postTitle.value,
      content_body: newPostContent.value,
    }),
  });
  // Empty post title and content
  if (response.ok) {
    postTitle.value = "";
    newPostContent.value = "";
    document.location.replace("/dashboard");
  } else {
    alert(
      response.statusText +
        ": Please make sure that your posts content is at least 4 characters long"
    );
  }
};

formCreatePost.addEventListener("submit", createPost);
