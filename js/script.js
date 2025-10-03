// Navigation shrink/expand functionality
const mainNav = document.getElementById('mainNav');
// Target the desktop navigation container. Navigation links are hidden
// via CSS on small screens and always visible on larger viewports.
const navLinks = document.getElementById('navLinksDesktop');

// We no longer compute visibility for the desktop navigation here.  Visibility
// is controlled entirely via responsive utility classes in the markup.

function handleScroll() {
  // Shrink and fade the navigation bar slightly when scrolling down
  if (window.scrollY > 60) {
    mainNav.classList.add('scale-95', 'opacity-90');
  } else {
    mainNav.classList.remove('scale-95', 'opacity-90');
  }
  // No need to toggle nav links visibility here; responsive CSS handles it.
}

// Initialize on page load
handleScroll();
window.addEventListener('scroll', handleScroll);
// We don't need to listen to resize events for nav visibility as this is
// handled by CSS.

// Expand nav when hovering (desktop only).  We no longer show/hide links
// programmatically; we simply remove the scale and opacity classes on hover to
// restore the bar to full size.
if (mainNav) {
  mainNav.addEventListener('mouseenter', () => {
    mainNav.classList.remove('scale-95', 'opacity-90');
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