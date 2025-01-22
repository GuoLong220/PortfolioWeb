export function initSkills(skills) {
  const skillsGrid = document.querySelector('.skills-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderSkills(filteredSkills) {
    skillsGrid.innerHTML = '';
    filteredSkills.forEach((skill, index) => {
      const skillCard = createSkillCard(skill, index);
      skillsGrid.appendChild(skillCard);
    });
  }

  function createSkillCard(skill, index) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.setProperty('--i', index);

    card.innerHTML = `
      <h3>${skill.name}</h3>
      <div class="skill-progress">
        <div class="progress-bar" 
             style="width: ${skill.level}%; background: ${skill.color}">
        </div>
      </div>
      <span class="skill-level">${skill.level}%</span>
    `;

    return card;
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filteredSkills = category === 'all' 
        ? skills 
        : skills.filter(skill => skill.category === category);
      
      renderSkills(filteredSkills);
    });
  });

  // Initial render
  renderSkills(skills);
}