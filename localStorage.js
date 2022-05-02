function pageLoad() {
  const searchTerm = localStorage.getItem("searchTerm");
  if (searchTerm) {
    // console.log(searchTerm);
    document.getElementById("searchbar").value = searchTerm;
  }
  document.getElementById("searchbar").addEventListener("input", afterInput);
}

function afterInput(e) {
  // console.log(e.target.value);
  localStorage.setItem("searchTerm", e.target.value);
}

document.addEventListener("DOMContentLoaded", pageLoad);
