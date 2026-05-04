// =========================================
// NETFLIX CLONE PORTFOLIO SCRIPTS
// =========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Horizontal Slider Controls ---
  const sliderBtns = document.querySelectorAll('.slider-btn');
  
  sliderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find the sibling row-container
      const container = e.target.closest('.slider-wrapper').querySelector('.row-container');
      const containerWidth = container.offsetWidth;
      
      if (btn.classList.contains('left')) {
        container.scrollBy({ left: -containerWidth * 0.8, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: containerWidth * 0.8, behavior: 'smooth' });
      }
    });
  });

  // --- Prevent hover states from bleeding outside on touch devices ---
  // A simple script to ensure tiles only hover on actual hover, not tap
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('touchstart', function() {
      this.classList.add('hover-active');
    }, {passive: true});
    tile.addEventListener('touchend', function() {
      setTimeout(() => this.classList.remove('hover-active'), 500);
    }, {passive: true});
  });

});

// --- Intro Screen Logic ---
function enterPortfolio(profileName) {
  const introScreen = document.getElementById('intro-screen');
  const mainApp = document.getElementById('main-app');
  
  // Optional: update the avatar in navbar based on profile chosen
  const navAvatar = document.getElementById('nav-avatar');
  
  // Fade out intro
  introScreen.style.opacity = '0';
  
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    
    // Add a slight fade-in effect to the main app
    mainApp.style.opacity = '0';
    setTimeout(() => {
      mainApp.style.opacity = '1';
    }, 50);
    
    // Scroll to top
    window.scrollTo(0,0);
  }, 500); // Wait for CSS transition
}

function exitPortfolio() {
  const introScreen = document.getElementById('intro-screen');
  const mainApp = document.getElementById('main-app');
  
  // Fade out main app
  mainApp.style.opacity = '0';
  
  setTimeout(() => {
    mainApp.classList.add('hidden');
    introScreen.classList.remove('hidden');
    
    // Add a slight fade-in effect to the intro screen
    introScreen.style.opacity = '0';
    setTimeout(() => {
      introScreen.style.opacity = '1';
    }, 50);
    
    // Scroll to top
    window.scrollTo(0,0);
  }, 500); // Wait for CSS transition
}

// --- Modal Logic ---
const modalData = {
  linkedin: {
    bg: 'white',
    color: '#0077b5',
    icon: 'fab fa-linkedin',
    imgText: 'LinkedIn',
    title: 'LinkedIn Profile',
    desc: 'Connect with me on LinkedIn for professional networking and updates.',
    subdesc: 'Regular updates on professional achievements, industry insights, and networking opportunities.',
    actions: '<a href="https://www.linkedin.com/in/adnan-kaisar-333622292" target="_blank" class="btn btn-play" style="background: white; color: black;">Link</a>'
  },
  schedule: {
    bg: '#fdf2e9',
    color: '#e67e22',
    icon: 'fas fa-calendar-alt',
    imgText: 'Schedule Your Appointment',
    title: 'Schedule a Call',
    desc: 'Book a call with me to discuss potential collaborations, projects, or any queries you may have.',
    subdesc: 'Phone: +91 7780946112<br>Email: adnankaisar112@gmail.com',
    actions: '<a href="mailto:adnankaisar112@gmail.com" class="btn btn-play" style="background: white; color: black; margin-right: 10px;">Email Me</a> <a href="tel:+917780946112" class="btn btn-more">Call Me</a>'
  },
  github: {
    bg: 'white',
    color: '#333',
    icon: 'fab fa-github',
    imgText: 'GitHub',
    title: 'GitHub',
    desc: 'Explore my open-source contributions and personal projects on GitHub.',
    subdesc: 'A collection of my web development, data analysis, and IoT projects.',
    actions: '<a href="https://github.com/AdnanKaisar" target="_blank" class="btn btn-play" style="background: white; color: black;">Link</a>'
  }
};

function openModal(type) {
  const modal = document.getElementById('detail-modal');
  const data = modalData[type];
  
  if (!data) return;
  
  document.getElementById('modal-img-container').style.background = data.bg;
  document.getElementById('modal-img-container').style.color = data.color;
  document.getElementById('modal-img-container').innerHTML = `
    <i class="${data.icon}" style="font-size: 6rem;"></i>
    <h2 style="font-size: 2rem; margin-top: 15px;">${data.imgText}</h2>
  `;
  
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-desc').innerText = data.desc;
  document.getElementById('modal-subdesc').innerHTML = data.subdesc;
  document.getElementById('modal-actions').innerHTML = data.actions;
  
  modal.classList.remove('hidden');
  
  // Fade in
  setTimeout(() => {
    modal.classList.add('visible');
  }, 10);
  
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('visible');
  
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }, 300);
}

