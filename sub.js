const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)


fetch("http://aivars.dk/wordpress/wp-json/wp/v2/posts/"+id)
  .then(res=>res.json())
.then(showPost)


function showPost(post){
  console.log(post)
  document.querySelector("article h1").textContent=post.title.rendered
}