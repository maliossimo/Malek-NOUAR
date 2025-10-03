// Navigation shrink/expand functionality
const mainNav = document.getElementById('mainNav');
const navLinks = document.getElementById('navLinks');

function handleScroll() {
  if (window.scrollY > 60) {
    mainNav.classList.add('scale-95', 'opacity-90');
    // Hide navigation links on large screens when collapsed
    if (navLinks) navLinks.classList.add('hidden');
  } else {
    mainNav.classList.remove('scale-95', 'opacity-90');
    if (navLinks) navLinks.classList.remove('hidden');
  }
}

// Initialize on page load
handleScroll();
window.addEventListener('scroll', handleScroll);

// Expand nav when hovering (desktop only)
if (mainNav) {
  mainNav.addEventListener('mouseenter', () => {
    mainNav.classList.remove('scale-95', 'opacity-90');
    if (navLinks) navLinks.classList.remove('hidden');
  });
  mainNav.addEventListener('mouseleave', () => {
    handleScroll();
  });
}

// Reveal animations using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
reveals.forEach((el) => {
  observer.observe(el);
});