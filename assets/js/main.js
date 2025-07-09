// JS for Navbar---------
$(function ($) {
  $(".mobile_btn").on("click", function () {
    $(".main_menu").slideToggle();
    $(".mobile_btn i").toggleClass("fa-xmark fa-xl");
  });

  if ($(window).width() < 768) {
    $(".main_menu ul li a").on("click", function () {
      $(this)
        .parent(".has_dropdown")
        .children(".sub_menu")
        .css({ "padding-left": "15px" })
        .stop()
        .slideToggle();

      $(this)
        .parent(".has_dropdown")
        .children("a")
        .find(".fa-angle-right")
        .stop()
        .toggleClass("fa-rotate-90");
    });
  }
});


// Js for home banner
const sliderControls = document.querySelector(".slider-controls");
const sliderTabs = sliderControls.querySelectorAll(".slider-tab");
const sliderIndicator = sliderControls.querySelector(".slider-indicator");
// Update the indicator
const updateIndicator = (tab, index) => {
  document.querySelector(".slider-tab.current")?.classList.remove("current");
  tab.classList.add("current");
  sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
  sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;
  // Calculate the scroll position and scroll smoothly
  const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
}
// Initialize swiper instance
const swiper = new Swiper(".slider-container", {
  effect: "fade",
  speed: 1300,
  autoplay: { delay: 4000 },
  navigation: {
    prevEl: "#slide-prev",
    nextEl: "#slide-next",
  },
  on: {
    // Update indicator on slide change
    slideChange: () => {
      const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
      updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
    },
    reachEnd: () => swiper.autoplay.stop(),
  },
});

// custom  JS CAse study slider
var swiperMobile = new Swiper('.swiper-container.swiper-full-mobile', {
  slidesPerView: 4,
  spaceBetween: 0,
  slideToClickedSlide: true,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  effect: "coverflow",
  grabCursor: true,
  coverflowEffect: {
    rotate: -10,
    stretch: 10,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 5000,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
    nextEl: '.next-1',
    prevEl: '.prev-1',
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
    }
  }
});



//   slider 
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }

// popup form
// function openForm() {
//   document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }

// function toggleFabAnimation() {
//   const fabWrapper = document.querySelector('.fab-wrapper');
//   const fabtext = document.querySelector('.fab-wrapper-text');
//   if (fabWrapper.classList.contains('active')) {
//     fabWrapper.classList.remove('active');
//     fabWrapper.style.animation = 'none';
//     fabtext.style.display = 'block';
//   } else {
//     fabWrapper.classList.add('active');
//     fabWrapper.style.animation = 'none';
//     fabtext.style.display = 'none';
//   }
// }

// floating button
// document.addEventListener("DOMContentLoaded", function () {
//   window.onscroll = function () {
//     scrollFunction()
//   };

//   function scrollFunction() {
//     var scrollText = document.querySelector(".fab-wrapper p");
//     var scrollPosition = window.scrollY || window.pageYOffset;
//     var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     var scrollPercent = (scrollPosition / windowHeight) * 100;

//     if (scrollPercent >= 80) {
//       scrollText.classList.add("visible");
//     } else {
//       scrollText.classList.remove("visible");
//     }
//   }
//   scrollFunction();
// });

// -------------------------------------
// js for time lime line
// -------------------------------------
  const historySection = document.querySelector('.history');
  const progressBar = document.querySelector('.timeline_progress-bar');

  window.addEventListener('scroll', () => {
    const rect = historySection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Only calculate when the section is in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalHeight = rect.height;
      const scrolled = Math.min(Math.max(windowHeight - rect.top, 0), totalHeight);
      const percentage = scrolled / totalHeight;
      const barHeight = percentage * totalHeight;
      progressBar.style.height = `${barHeight}px`;
    } else if (rect.bottom <= 0) {
      // If fully scrolled past
      progressBar.style.height = `${historySection.offsetHeight}px`;
    } else {
      // If not yet in view
      progressBar.style.height = `0px`;
    }
  });




// JS for testimonial

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// --------------------------------
// cursor js
// --------------------------------
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable'); // Add this class to any link/text/image

// Mousemove Event
document.body.addEventListener('mousemove', function (e) {
  // Get mouse position (viewport based)
  const x = e.clientX;
  const y = e.clientY;

  // Animate cursor balls
  gsap.to($bigBall, {
    duration: 0.4,
    x: x - 15,
    y: y - 15
  });

  gsap.to($smallBall, {
    duration: 0.1,
    x: x - 5,
    y: y - 5
  });
});

// Hover effect (scale up the big ball)
$hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to($bigBall, {
      duration: 0.3,
      scale: 3
    });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to($bigBall, {
      duration: 0.3,
      scale: 1
    });
  });
});








