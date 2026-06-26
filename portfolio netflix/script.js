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

  // --- 3D Parallax Tilt Effect ---
  const parallaxCards = document.querySelectorAll('.tile, .tile-top-pick, .btn, .hero-image-container');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    parallaxCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate tilt angles (max 12 degrees for smooth look)
        const rotateX = -(mouseY / (cardHeight / 2)) * 12;
        const rotateY = (mouseX / (cardWidth / 2)) * 12;
        
        // Apply transform
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

});

// --- Intro Screen Logic ---
function enterPortfolio(profileName) {
  const introScreen = document.getElementById('intro-screen');
  const mainApp = document.getElementById('main-app');
  
  // Optional: update the avatar in navbar based on profile chosen
  const navAvatar = document.getElementById('nav-avatar');
  
  // Update background based on profile
  const heroImageContainer = document.querySelector('.hero-image-container');
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');

  const avatarColors = {
    'Recruiter': '#2d82e6',
    'Lost Kid': '#e50914',
    'Stalker': '#f4b400',
    'Investor': '#0f9d58'
  };

  if (profileName === 'Lost Kid' || profileName === 'Stalker') {
    if (heroBg) {
      heroBg.style.backgroundImage = 'url("anime_bg.png")';
      heroBg.style.backgroundSize = 'cover';
      heroBg.style.backgroundPosition = 'center';
      heroBg.style.backgroundRepeat = 'no-repeat';
    }
    
    if (heroImageContainer) heroImageContainer.classList.add('hidden');
    if (heroContent) heroContent.classList.add('hero-full-width');
  } else {
    if (heroBg) {
      heroBg.style.backgroundImage = 'none';
    }
    
    if (heroImageContainer) heroImageContainer.classList.remove('hidden');
    if (heroContent) heroContent.classList.remove('hero-full-width');
  }

  // Update the avatar in navbar based on profile chosen
  if (navAvatar && avatarColors[profileName]) {
    if (profileName === 'Lost Kid' || profileName === 'Stalker') {
      const color = avatarColors[profileName];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="10" fill="${color}" /><circle cx="35" cy="45" r="6" fill="white" /><circle cx="65" cy="45" r="6" fill="white" /><path d="M 35 65 Q 50 80 65 65" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" /></svg>`;
      navAvatar.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    } else {
      navAvatar.src = 'myimage.jpeg';
    }
  }
  
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
    bg: 'linear-gradient(135deg, rgba(0, 162, 255, 0.18), rgba(0, 162, 255, 0.05))',
    color: '#00a2ff',
    icon: 'fab fa-linkedin',
    imgText: 'LinkedIn',
    title: 'LinkedIn Profile',
    desc: 'Connect with me on LinkedIn for professional networking and updates.',
    subdesc: 'Regular updates on professional achievements, industry insights, and networking opportunities.',
    actions: '<a href="https://www.linkedin.com/in/adnan-kaisar-333622292" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fab fa-linkedin"></i> Connect</a>'
  },
  schedule: {
    bg: 'linear-gradient(135deg, rgba(255, 174, 25, 0.18), rgba(255, 174, 25, 0.05))',
    color: '#ffae19',
    icon: 'fas fa-calendar-alt',
    imgText: 'Schedule a Call',
    title: 'Schedule a Call',
    desc: 'Book a call with me to discuss potential collaborations, projects, or any queries you may have.',
    subdesc: 'Phone: +91 7780946112<br>Email: adnankaisar112@gmail.com',
    actions: '<a href="mailto:adnankaisar112@gmail.com" class="btn btn-play" style="background: white; color: black; margin-right: 10px; text-decoration: none;"><i class="fas fa-envelope"></i> Email Me</a> <a href="tel:+917780946112" class="btn btn-more" style="text-decoration: none;"><i class="fas fa-phone-alt"></i> Call Me</a>'
  },
  github: {
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.03))',
    color: '#ffffff',
    icon: 'fab fa-github',
    imgText: 'GitHub',
    title: 'GitHub',
    desc: 'Explore my open-source contributions and personal projects on GitHub.',
    subdesc: 'A collection of my web development, data analysis, and IoT projects.',
    actions: '<a href="https://github.com/AdnanKaisar" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fab fa-github"></i> View Profile</a>'
  },
  education_btech: {
    bg: 'linear-gradient(rgba(20, 20, 20, 0.55), rgba(20, 20, 20, 0.55)), url("miet_college.png") center/cover no-repeat',
    color: 'white',
    icon: 'fas fa-graduation-cap',
    imgText: 'B.Tech CSE',
    title: 'Model Institute of Engineering & Technology (Autonomous)',
    desc: 'Bachelor of Technology in Computer Science & Engineering (2023 - 2027)',
    subdesc: '<strong>Location:</strong> Kot Bhalwal, Jammu - 181122<br><strong>Status:</strong> Autonomous Institution<br><strong>Highlights:</strong> Focusing on Python programming, Data Science, and IoT Systems.',
    actions: '<a href="https://mietjmu.in/" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fas fa-external-link-alt"></i> Visit Website</a><button onclick="closeModal()" class="btn btn-more" style="margin-left: 10px;">Close</button>'
  },
  education_12th: {
    bg: 'linear-gradient(135deg, #e65c00, #F9D423)',
    color: 'white',
    icon: 'fas fa-school',
    imgText: '12th Standard',
    title: 'Govt. Higher Secondary School',
    desc: 'Higher Secondary Education (Class XII) - Completed in 2022',
    subdesc: '<strong>Stream:</strong> Non-Medical (Physics, Chemistry, Mathematics).',
    actions: '<button onclick="closeModal()" class="btn btn-play" style="background: white; color: black;">Close</button>'
  },
  education_10th: {
    bg: 'linear-gradient(135deg, #2b5876, #4e4376)',
    color: 'white',
    icon: 'fas fa-school',
    imgText: '10th Standard',
    title: 'Iqra Public Secondary School',
    desc: 'Secondary School Education (Class X) - Completed in 2020',
    subdesc: '<strong>Board:</strong> General curriculum focusing on Science, Math, and Languages.',
    actions: '<button onclick="closeModal()" class="btn btn-play" style="background: white; color: black;">Close</button>'
  },
  internship_nit: {
    bg: 'linear-gradient(rgba(20, 20, 20, 0.65), rgba(20, 20, 20, 0.65)), url("portfolio_bg.png") center/cover no-repeat',
    color: '#ffae19',
    icon: 'fas fa-microchip',
    imgText: 'IoT Internship',
    title: 'National Institute of Technology (NIT), Srinagar',
    desc: 'Internship in Internet of Things (IoT) & Sensor Networks',
    subdesc: '<strong>Focus:</strong> Embedded systems, microcontroller programming, sensor interfacing, and cloud data logging.<br><strong>Highlights:</strong> Developed IoT monitoring modules and analyzed real-time sensor streams.',
    actions: '<a href="nit_srinagar_certificate.jpg" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fas fa-certificate"></i> View Certificate</a><button onclick="closeModal()" class="btn btn-more" style="margin-left: 10px;">Close</button>'
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

