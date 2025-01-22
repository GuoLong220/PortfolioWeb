const GAS_ENDPOINT = import.meta.env.VITE_GAS_ENDPOINT || import.meta.env.GAS_ENDPOINT;
const CACHE_KEY = 'portfolioData';
const CACHE_EXPIRY = 60 * 1000; // 1 分鐘（單位：毫秒）

export async function fetchPortfolioData() {
  // 檢查快取中是否有資料
  const cachedData = getCachedData();
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(GAS_ENDPOINT);
    const data = await response.json();
    const processedData = {
      about: processAbout(data.about),
      skills: processSkills(data.skills),
      timeline: processTimeline(data.timeline),
      projects: processProjects(data.projects)
    };

    // 將資料存入快取
    cacheData(processedData);
    return processedData;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return getDefaultData();
  }
}

// 從快取中獲取資料
function getCachedData() {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return null;

  const { data, timestamp } = JSON.parse(cachedData);
  const now = Date.now();

  // 檢查快取是否過期
  if (now - timestamp < CACHE_EXPIRY) {
    return data;
  } else {
    // 快取過期，刪除資料
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

// 將資料存入快取
function cacheData(data) {
  const cache = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function processAbout(about) {
  return about[0]; // 假設只有一筆資料
}

function processSkills(skills) {
  return skills.map(skill => ({
    name: skill.name,
    category: skill.category,
    level: parseInt(skill.level),
    color: getSkillColor(skill.category)
  }));
}

function processTimeline(timeline) {
  return timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function processProjects(projects) {
  return projects.map(project => ({
    ...project,
    technologies: project.technologies.split(',').map(tech => tech.trim())
  }));
}

function getSkillColor(category) {
  const colors = {
    languages: 'var(--accent-green)',
    frameworks: 'var(--accent-blue)',
    tools: 'var(--accent-purple)'
  };
  return colors[category] || 'var(--accent-green)';
}

function getDefaultData() {
  return {
    about: {
      name: 'Your Name',
      title: 'Software Engineer',
      specialties: ['Web Development', 'Cloud Architecture', 'DevOps'],
      passions: ['Clean Code', 'Innovation', 'Problem Solving']
    },
    skills: [
      { name: 'Loading...', category: 'Loading...', level: 100, color: 'Loading...' }
    ],
    timeline: [
      {
        date: 'Loading...',
        type: 'Loading...',
        title: 'Loading...',
        description: 'Loading...'
      }
    ],
    projects: [
      {
        title: 'Loading...',
        description: 'Loading...',
        technologies: ['Loading...'],
        github: 'Loading...',
        demo: 'Loading...'
      }
    ]
  };
}