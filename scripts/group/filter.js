const filterBtn = document.getElementById("filter_btn");
const filterGroup = document.getElementById("filter_group");

filterBtn.addEventListener("click", () => {
    filterGroup.classList.toggle("filter_show");
});