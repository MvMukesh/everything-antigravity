// app.js

// Initialize Marked with Highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
});

let eagData = {};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initTerminals();
  fetchDashboardData();
});

async function fetchDashboardData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('Network response was not ok');
    eagData = await res.json();
    
    // Update version badge
    if (eagData.package && eagData.package.version) {
      document.getElementById('version-badge').textContent = `v${eagData.package.version}`;
    }

    renderOverview();
    renderAgents();
    renderSkills();
    renderWorkflows();
    renderRules();
    
  } catch (error) {
    console.error('Failed to fetch EAG data:', error);
    document.getElementById('stats-grid').innerHTML = `
      <div class="stat-card glass-panel" style="border-color: var(--error-color)">
        <div class="stat-value" style="color: var(--error-color)">Error</div>
        <div class="stat-label">Could not load API data</div>
      </div>
    `;
  }
}

// Navigation Logic
function initNavigation() {
  const links = document.querySelectorAll('.nav-links li');
  const sections = document.querySelectorAll('.view-section');

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      link.classList.add('active');
      const target = link.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });
}

// Render Overview
function renderOverview() {
  const grid = document.getElementById('stats-grid');
  
  const stats = [
    { label: 'Subagents Active', value: eagData.agents?.length || 0 },
    { label: 'Skill Packs Installed', value: eagData.skills?.length || 0 },
    { label: 'Workflows Registered', value: eagData.workflows?.length || 0 },
    { label: 'Core Version', value: eagData.package?.version || 'Unknown' }
  ];

  grid.innerHTML = stats.map(stat => `
    <div class="stat-card glass-panel">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

// Generic Card Renderer
function createCard(title, description, rawContent) {
  const div = document.createElement('div');
  div.className = 'item-card glass-panel';
  div.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
  `;
  div.addEventListener('click', () => {
    openModal(title, rawContent);
  });
  return div;
}

// Extract first paragraph for description
function getPreview(markdown) {
  if (!markdown) return 'No description provided.';
  const match = markdown.match(/^(?!#)(?!\s*$)(.+)$/m);
  return match ? match[1].substring(0, 150) + '...' : 'Click to view details...';
}

function renderAgents() {
  const grid = document.getElementById('agents-grid');
  const searchInput = document.getElementById('search-agents');
  
  const render = (filter = '') => {
    grid.innerHTML = '';
    const agents = eagData.agents || [];
    agents
      .filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(agent => {
        grid.appendChild(createCard(agent.name, getPreview(agent.content), agent.content));
      });
  };
  
  render();
  searchInput.addEventListener('input', (e) => render(e.target.value));
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = '';
  (eagData.skills || []).forEach(skill => {
    grid.appendChild(createCard(skill.name, getPreview(skill.content), skill.content));
  });
}

function renderWorkflows() {
  const grid = document.getElementById('workflows-grid');
  grid.innerHTML = '';
  (eagData.workflows || []).forEach(wf => {
    grid.appendChild(createCard(wf.name, getPreview(wf.content), wf.content));
  });
}

// Rules / Governance
function renderRules() {
  const tabs = document.querySelectorAll('#rules-tabs .tab-btn');
  const container = document.getElementById('rules-content');
  
  const renderTab = (type) => {
    const rawContent = eagData.governance[type] || 'No content found.';
    container.innerHTML = DOMPurify.sanitize(marked.parse(rawContent));
  };
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(tab.getAttribute('data-rule'));
    });
  });
  
  if (tabs.length > 0) renderTab('soul'); // default
}

// Modal Logic
function initModals() {
  const modal = document.getElementById('md-modal');
  const closeBtn = document.getElementById('modal-close');
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function openModal(title, markdownContent) {
  const modal = document.getElementById('md-modal');
  document.getElementById('modal-title').textContent = title;
  const parsedHTML = DOMPurify.sanitize(marked.parse(markdownContent || ''));
  document.getElementById('modal-body').innerHTML = parsedHTML;
  modal.classList.add('active');
}

// Terminal / CLI Execution Logic
function initTerminals() {
  const doctorBtn = document.getElementById('btn-doctor');
  const verifyBtn = document.getElementById('btn-verify');
  const output = document.getElementById('terminal-output');
  
  const runCmd = async (endpoint, btn) => {
    const originalText = btn.textContent;
    btn.textContent = 'Running...';
    btn.disabled = true;
    output.textContent = `Executing request to ${endpoint}...\n`;
    
    try {
      const res = await fetch(endpoint, { method: endpoint === '/api/verify' ? 'POST' : 'GET' });
      const data = await res.json();
      
      // Basic ANSI color strip for clean display if desired, 
      // but leaving it raw handles basic text. 
      // A full ANSI-to-HTML formatter could be used, for now we strip ANSI for safe HTML:
      const stripAnsi = (str) => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
      
      output.textContent = stripAnsi(data.output || '') + '\n' + stripAnsi(data.error || '');
      
    } catch (e) {
      output.innerHTML = `<span class="error">Execution failed: ${e.message}</span>`;
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  };
  
  doctorBtn.addEventListener('click', () => runCmd('/api/doctor', doctorBtn));
  verifyBtn.addEventListener('click', () => runCmd('/api/verify', verifyBtn));
}
