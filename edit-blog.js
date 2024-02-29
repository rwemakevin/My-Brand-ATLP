const form = document.getElementById("edit-blog-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");
let comment = [];
let blogs = [];
let urlParams = new URLSearchParams(window.location.search);
let idFromUrl = urlParams.get("id");
tinymce.init({
  selector: "#content",

  plugins:
    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography ",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  mergetags_list: [
    { value: "First.Name", title: "First Name" },
    { value: "Email", title: "Email" },
  ],
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
});

document.addEventListener("DOMContentLoaded", () => {
  blogs = JSON.parse(localStorage.getItem("blogs"));
  let blogToEdit = blogs.find((item) => item.id == idFromUrl);
  console.log(blogToEdit);
  titleInput.value = blogToEdit.title;
  authorInput.value = blogToEdit.author;
  contentInput.value = blogToEdit.content;
  comment = blogToEdit.comments;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  blogs = blogs.map((item) => {
    if (item.id == idFromUrl) {
      return {
        // id: parseInt(idFromUrl),
        // title: titleInput.value,
        // content: contentInput.value,
        // author: authorInput.value,
        // comments: comment,
        ...item,
        author: authorInput.value,
        title: titleInput.value,
        content: contentInput.value,
      };
    }
    return item;
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));
  window.location.href = "./blog-dashboard.html";
});