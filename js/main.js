import { initTerminal } from './terminal.js';
import { initSkills } from './skills.js';
import { initTimeline } from './timeline.js';
import { initProjects } from './projects.js';
import { fetchPortfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
  const navLinks = document.querySelector('.nav-links');

  // 點擊連結後隱藏選單
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
      navLinks.classList.remove('active');
    }
  });

  const terminalContent = document.querySelector('.typing-text');

  // 顯示預設的 Loading 訊息
  terminalContent.textContent = '> Loading...';

  // 在網站一開始時抓取資料

  // 重試抓取資料
  let portfolioData;
  while (!portfolioData) {
    try {
      portfolioData = await fetchPortfolioData();
    } catch (error) {
      console.error('Retrying to fetch data...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 秒後重試
    }
  }

  // Initialize terminal animation
  initTerminal(portfolioData);

  // 更新 About 資料
  const aboutData = portfolioData.about;
  document.title = `${aboutData.Name}'s Portfolio`;
  document.getElementById('profile-name').textContent = aboutData.Name;
  document.getElementById('profile-title').textContent = aboutData.Title;
  document.getElementById('profile-bio').textContent = aboutData.Bio;
  const githubLink = document.querySelector('.social-icon.github');
  if (githubLink) {
    githubLink.href = `https://github.com/${aboutData.githubUsername}`;
  }

  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector('footer p');
  footerText.textContent = `${currentYear} ${aboutData.Name}. All rights reserved.`;

  // 更新個人相片
  const profilePhoto = document.getElementById('profile-photo');
  profilePhoto.src = aboutData.Photo;

  // Handle splash screen
  setTimeout(() => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    splashScreen.classList.add('fade-out');
    mainContent.classList.remove('hidden');

    setTimeout(() => {
      splashScreen.remove();
      initMainContent(portfolioData);
    }, 500);
  }, 10000); // 歡迎頁面顯示秒數

  // Initialize mobile menu
  initMobileMenu();
});

function initMainContent(data) {
  // Initialize all sections
  initSkills(data.skills);
  initTimeline(data.timeline);
  initProjects(data.projects);

  // Initialize scroll animations
  initScrollAnimations();
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
  });
}