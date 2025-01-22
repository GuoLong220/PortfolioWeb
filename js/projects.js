export function initProjects(projects) {
  const projectsGrid = document.querySelector('.projects-grid');

  function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.setProperty('--i', index);
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-technologies">
        ${project.technologies.map(tech => `
          <span class="tech-tag">${tech}</span>
        `).join('')}
      </div>
      <div class="project-links">
        ${project.github ? `
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link github">
            View on GitHub
          </a>
        ` : ''}
        ${project.demo ? `
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link demo">
            Live Demo
          </a>
        ` : ''}
      </div>
    `;

    return card;
  }

  projects.forEach((project, index) => {
    const projectCard = createProjectCard(project, index);
    projectsGrid.appendChild(projectCard);
  });
}