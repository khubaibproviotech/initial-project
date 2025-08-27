
const nav = document.querySelector(".navbar")

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.style.animation = "navChange"
    nav.classList.remove("scrolled")
  }
})


if (document.querySelector('.swiperClass')) {
  var portfolioSlider = new Swiper(".swiperClass", {
    spaceBetween: 50,
    direction: 'horizontal',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
      320: { slidesPerView: 1},
      576: { slidesPerView: 1},
      768: { slidesPerView: 3},
      992: { slidesPerView: 4},
      1200: { slidesPerView: 5 },
    }
  });
}

// navbar link active function

// const navigation = () => {
//   const navItems = document.querySelectorAll(".nav-item");
//   let pathName = window.location.pathname;

//   // Remove trailing slash unless it's the root '/'
//   if (pathName.length > 1 && pathName.endsWith("/")) {
//     pathName = pathName.slice(0, -1);
//   }

//   navItems.forEach((navItem) => {
//     let linkPath = new URL(navItem.href).pathname;

//     if (linkPath.length > 1 && linkPath.endsWith("/")) {
//       linkPath = linkPath.slice(0, -1);
//     }

//     if (pathName === linkPath) {
//       navItem.classList.add("active");
//     } else {
//       navItem.classList.remove("active");
//     }
//   });
// };