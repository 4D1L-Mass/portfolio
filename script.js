// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");
let cursorX = 0,
  cursorY = 0;
let dotX = 0,
  dotY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursor() {
  dotX += (cursorX - dotX) * 0.8;
  dotY += (cursorY - dotY) * 0.8;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top = dotY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for cursor
document.querySelectorAll(".hover-target").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// OPEN MENU PHONE BY ADD CLASS
let menuPhone = document.querySelector(".nav-menu-phone");
let icon_menu_open = document.querySelector(".fa-bars");
icon_menu_open.addEventListener("click", () => {
  menuPhone.classList.add("add-class-to-menu");
});

let h_link = document.querySelector(".home-link");
h_link.addEventListener("click", () => {
  menuPhone.classList.remove("add-class-to-menu");
});

let a_link = document.querySelector(".about-link");
a_link.addEventListener("click", () => {
  menuPhone.classList.remove("add-class-to-menu");
});

let pr_link = document.querySelector(".pr-link");
pr_link.addEventListener("click", () => {
  menuPhone.classList.remove("add-class-to-menu");
});


let c_link = document.querySelector(".contact-link");
c_link.addEventListener("click", () => {
  menuPhone.classList.remove("add-class-to-menu");
});
// CLOSE MENU PHONE BY REMOVE CLASS
let icon_close_menu = document.querySelector(".div-close");
icon_close_menu.addEventListener("click", () => {
  menuPhone.classList.remove("add-class-to-menu");
});

// Text Scramble Effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\/[]{}—=+*^?#________";
    this.originalText = el.dataset.text || el.textContent;
  }

  scramble() {
    let iteration = 0;
    const interval = setInterval(() => {
      this.el.textContent = this.originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return this.originalText[index];
          }
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join("");

      if (iteration >= this.originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 30);
  }
}





document.querySelector(".btn-primary").addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
});

document.querySelector(".btn-secondary").addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("POR").addEventListener("click", () => {
    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
});
// Trigger scramble on load
const scrambleEl = document.querySelector(".scramble-text");
const scrambler = new TextScramble(scrambleEl);

setTimeout(() => {
  scrambler.scramble();
}, 1000);

// Re-scramble on hover
scrambleEl.addEventListener("mouseenter", () => {
  scrambler.scramble();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Parallax on scroll
// let ticking = false;

// window.addEventListener("scroll", () => {
//   if (!ticking) {
//     requestAnimationFrame(() => {
//       const scrolled = window.pageYOffset;
//       const parallax = document.querySelector(".hero-bg");

//       if (parallax) {
//         parallax.style.transform = `translateY(${scrolled * 0.2}px)`;
//       }

//       ticking = false;
//     });

//     ticking = true;
//   }
// });

// Tab Switching
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.dataset.tab;

    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(tabId).classList.add("active");

    // Animate skill bars if skills tab
    if (tabId === "skills") {
      setTimeout(animateSkills, 100);
    }
  });
});

// Skill Bars Animation
function animateSkills() {
  document.querySelectorAll(".skill-item").forEach((item, index) => {
    const level = item.dataset.level;
    const fill = item.querySelector(".skill-fill");
    setTimeout(() => {
      fill.style.width = level + "%";
    }, index * 100);
  });
}

// Animate on page load if skills tab is active
if (document.querySelector(".tab-btn.active").dataset.tab === "skills") {
  setTimeout(animateSkills, 500);
}

// Image 3D Tilt Effect
const imageWrapper = document.getElementById("imageWrapper");

imageWrapper.addEventListener("mousemove", (e) => {
  const rect = imageWrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;

  imageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

imageWrapper.addEventListener("mouseleave", () => {
  imageWrapper.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
});

// Intersection Observer for entrance animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".content-right, .tabs-container").forEach((el) => {
  observer.observe(el);
});

// Form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector(".submit-btn");
  btn.innerHTML = "<span>Message Sent!</span>";
  setTimeout(() => {
    btn.innerHTML = "<span>Send Message</span>";
    e.target.reset();
  }, 3000);
});
