export function initTimeline(timelineData) {
  const timelineContainer = document.querySelector('.timeline-container');

  function createTimelineItem(item) {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';

    timelineItem.innerHTML = `
      <div class="timeline-card">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-date">${formatDate(item.date)}</div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          ${item.links ? createLinks(item.links) : ''}
        </div>
      </div>
    `;

    return timelineItem;
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  }

  function createLinks(links) {
    return `
      <div class="timeline-links">
        ${Object.entries(links).map(([key, url]) => `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="timeline-link ${key.toLowerCase()}">
            ${key}
          </a>
        `).join('')}
      </div>
    `;
  }

  // 清空容器並加入 Timeline 項目
  timelineContainer.innerHTML = '';
  timelineData.forEach((item) => {
    const timelineItem = createTimelineItem(item);
    timelineContainer.appendChild(timelineItem);
  });

  // 加入動畫效果
  animateTimeline();
}

function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 300); // 每個項目延遲 300ms 顯示
  });
}