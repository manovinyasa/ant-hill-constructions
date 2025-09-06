// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click", function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target){
      window.scrollTo({ top:target.offsetTop-70, behavior:"smooth" });
    }
  });
});

// Hamburger Toggle + X Animation
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", ()=>{
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function runCounters() {
  if (counterStarted) return;
  const triggerBottom = window.innerHeight * 0.8;

  counters.forEach(counter => {
    const counterTop = counter.getBoundingClientRect().top;
    if (counterTop < triggerBottom) {
      counterStarted = true;

      counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
          const target = +counter.getAttribute('data-target');
          const current = +counter.innerText;
          const increment = target / 200; // adjust speed

          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 15);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCounter();
      });
    }
  });
}

window.addEventListener('scroll', runCounters);
window.addEventListener('load', runCounters);

// Mobile menu toggle and close on link click
(function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      });
    });
  }
})();

// Dynamic counters animation
(function() {
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const start = +counter.textContent;
    const duration = 1200;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      counter.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }
  let animated = false;
  function onScroll() {
    const section = document.querySelector('.counters-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (!animated && rect.top < window.innerHeight && rect.bottom > 0) {
      document.querySelectorAll('.counter').forEach(animateCounter);
      animated = true;
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// Contact Form Submission
(function() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(() => {
          alert("Message Sent Successfully!");
          this.reset();
        }, (err) => {
          alert("Failed to Send Message. Please Try Again.");
          console.error(err);
        });
    });
  }
})();
// Newsletter Form Submission
(function() {
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_NEWSLETTER_TEMPLATE_ID", this)
        .then(() => {
          alert("Subscribed Successfully!");
          this.reset();
        }, (err) => {
          alert("Subscription Failed. Try Again.");
          console.error(err);
        });
    });
  }
})();
// Why choose us card activation
(function() {
  document.querySelectorAll('.wc-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      document.querySelectorAll('.wc-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
    });
  });
})();
// Testimonial carousel (moved to end for guaranteed DOM availability)
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.testimonial-item');
  const left = document.querySelector('.testimonial-arrow.left');
  const right = document.querySelector('.testimonial-arrow.right');
  if (!items.length || !left || !right) {
    console.log('Testimonial carousel: elements not found');
    return;
  }
  let current = 0;
  function show(idx) {
    items.forEach((el, i) => {
      el.classList.remove('active');
    });
    if (items[idx]) items[idx].classList.add('active');
    console.log('Showing testimonial', idx);
  }
  // Remove all .active classes at load, then show first
  items.forEach(el => el.classList.remove('active'));
  show(current);
  left.addEventListener('click', function() {
    current = (current - 1 + items.length) % items.length;
    show(current);
    console.log('Left arrow clicked');
  });
  right.addEventListener('click', function() {
    current = (current + 1) % items.length;
    show(current);
    console.log('Right arrow clicked');
  });
  document.addEventListener('keydown', function(e) {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') {
      current = (current - 1 + items.length) % items.length;
      show(current);
      console.log('ArrowLeft key pressed');
    } else if (e.key === 'ArrowRight') {
      current = (current + 1) % items.length;
      show(current);
      console.log('ArrowRight key pressed');
    }
  });
});



