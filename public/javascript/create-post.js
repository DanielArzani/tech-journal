const formCreatePost = document.querySelector(".section-create_post--form");
const postTitle = document.querySelector("#section-create_post--title");
const newPostContent = document.querySelector("#section-create_post--content");
const createPostBtn = document.querySelector(".section-create_post--content");

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
