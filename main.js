const input = document.getElementById("username");
const button = document.getElementById("searchBtn");
const results = document.getElementById("results");

button.addEventListener("click", function () {
  const username = input.value;
  console.log(username);
});