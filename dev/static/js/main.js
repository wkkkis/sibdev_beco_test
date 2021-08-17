let toggle_btn = document.querySelector(".toggle_btn")
let sidebar_width = document.querySelector(".sidebar")
let pages = document.querySelector(".main-wrapper__content-wrapper")
let pages_title = document.querySelector(".content__header")

toggle_btn.onclick = () =>  {
  toggle_btn.classList.toggle("active_sidebar-btn")
  sidebar_width.classList.toggle("active")
}

function activePages () {
  let pages_name = pages.children[0]
  let active_pages = document.querySelector(`.${pages_name.className.split(" ")[1]}-link`)
  active_pages.children[0].classList.add('sidebar__link__active')
}
activePages()

window.addEventListener('scroll', function(e) {
  if(e.target.documentElement.scrollTop.toFixed() > 10){
    pages_title.classList.add("no_title")
  }else {
    pages_title.classList.remove("no_title")
  }
})
