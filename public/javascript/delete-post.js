const deleteBtn = document.querySelector(".edit-post--delete-btn");

const deletePost = async function (e) {
  e.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    response.statusText;
  }
};

deleteBtn.addEventListener("click", deletePost);
