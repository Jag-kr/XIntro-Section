// ===== DOM Elements =====
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const navBtns = document.querySelectorAll('.nav-btn[aria-expanded]');

// ===== Mobile Menu Toggle =====
function openMenu() {
  nav.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  // Close all dropdowns when menu closes
  closeAllDropdowns();
}

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// ===== Dropdown Toggle =====
function closeAllDropdowns(except) {
  navBtns.forEach(btn => {
    if (btn !== except) {
      btn.setAttribute('aria-expanded', 'false');
      const dropdown = document.getElementById(btn.getAttribute('aria-controls'));
      if (dropdown) {
        dropdown.classList.remove('active');
      }
    }
  });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    // Close all other dropdowns
    closeAllDropdowns(btn);
    
    // Toggle current dropdown
    btn.setAttribute('aria-expanded', String(!isExpanded));
    const dropdown = document.getElementById(btn.getAttribute('aria-controls'));
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  });
});

// ===== Close Dropdown on Outside Click =====
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-link')) {
    closeAllDropdowns();
  }
});

// ===== Close Menu on Escape Key =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
    closeAllDropdowns();
  }
});

// ===== Handle Resize — Reset Mobile State on Desktop =====
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
