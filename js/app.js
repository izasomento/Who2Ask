/**
 * Who to Ask — Application Logic
 */

// State Management
const state = {
  currentQuestionIndex: 0,
  answers: [], // Array of selected option objects
  totalScore: 0,
  hasRedFlag: false,
  recommenderRole: '', // From Q1
  currentRecommenderName: '',
  evaluatedRecommenders: [] // Array of { name, score, label, meaning }
};

// DOM Elements
const sections = {
  home: document.getElementById('home-section'),
  name: document.getElementById('name-section'),
  questionnaire: document.getElementById('questionnaire-section'),
  results: document.getElementById('results-section'),
  ranking: document.getElementById('ranking-section')
};

const elements = {
  startBtn: document.getElementById('start-btn'),
  confirmNameBtn: document.getElementById('confirm-name-btn'),
  recommenderNameInput: document.getElementById('recommender-name'),
  nextBtn: document.getElementById('next-btn'),
  prevBtn: document.getElementById('prev-btn'),
  progressBar: document.getElementById('progress-bar'),
  questionContent: document.getElementById('question-content'),
  evalTargetName: document.getElementById('eval-target-name'),
  resultBadge: document.getElementById('result-badge'),
  resultMeaning: document.getElementById('result-meaning'),
  resultNextSteps: document.getElementById('result-next-steps'),
  resultChecklist: document.getElementById('result-checklist'),
  addAnotherBtn: document.getElementById('add-another-btn'),
  viewRankingBtn: document.getElementById('view-ranking-btn'),
  rankingList: document.getElementById('ranking-list'),
  addFromRankingBtn: document.getElementById('add-from-ranking-btn'),
  resetAllBtn: document.getElementById('reset-all-btn')
};

// Initialization
function init() {
  elements.startBtn.addEventListener('click', () => showSection('name'));
  
  elements.recommenderNameInput.addEventListener('input', (e) => {
    elements.confirmNameBtn.disabled = !e.target.value.trim();
  });
  
  elements.confirmNameBtn.addEventListener('click', startEvaluation);
  elements.nextBtn.addEventListener('click', goToNextQuestion);
  elements.prevBtn.addEventListener('click', goToPrevQuestion);
  
  elements.addAnotherBtn.addEventListener('click', () => {
    elements.recommenderNameInput.value = '';
    elements.confirmNameBtn.disabled = true;
    showSection('name');
  });
  
  elements.addFromRankingBtn.addEventListener('click', () => {
    elements.recommenderNameInput.value = '';
    elements.confirmNameBtn.disabled = true;
    showSection('name');
  });
  
  elements.viewRankingBtn.addEventListener('click', showRanking);
  elements.resetAllBtn.addEventListener('click', resetEverything);

  // Keyboard Support
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      // If we're on the Name screen and it's valid
      if (!sections.name.classList.contains('hidden') && !elements.confirmNameBtn.disabled) {
        startEvaluation();
      } 
      // If we're on the Questionnaire and an option is selected
      else if (!sections.questionnaire.classList.contains('hidden') && !elements.nextBtn.disabled) {
        goToNextQuestion();
      }
    }
  });
}

// Navigation Functions
function startEvaluation() {
  state.currentRecommenderName = elements.recommenderNameInput.value.trim();
  state.currentQuestionIndex = 0;
  state.answers = [];
  state.totalScore = 0;
  state.hasRedFlag = false;
  
  showSection('questionnaire');
  renderQuestion();
}

function showSection(sectionId) {
  Object.values(sections).forEach(section => section.classList.add('hidden', 'active'));
  sections[sectionId].classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Questionnaire Logic
function renderQuestion() {
  const question = questions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex) / questions.length) * 100;
  
  elements.progressBar.style.width = `${progress}%`;
  
  let html = `
    <h3 class="question-text">${question.text}</h3>
    <div class="options-list">
  `;
  
  question.options.forEach((option, index) => {
    const isSelected = state.answers[state.currentQuestionIndex] === option;
    html += `
      <button class="option-btn ${isSelected ? 'selected' : ''}" 
              onclick="selectOption(${index})">
        ${option.text}
      </button>
    `;
  });
  
  html += `</div>`;
  elements.questionContent.innerHTML = html;
  
  // Update Buttons
  elements.prevBtn.classList.toggle('hidden', state.currentQuestionIndex === 0);
  elements.nextBtn.disabled = !state.answers[state.currentQuestionIndex];
  elements.nextBtn.innerText = state.currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next';
}

function selectOption(optionIndex) {
  const question = questions[state.currentQuestionIndex];
  const selectedOption = question.options[optionIndex];
  
  state.answers[state.currentQuestionIndex] = selectedOption;
  
  // Re-render to show selection
  renderQuestion();
}

function goToNextQuestion() {
  if (state.currentQuestionIndex < questions.length - 1) {
    state.currentQuestionIndex++;
    renderQuestion();
  } else {
    calculateResults();
  }
}

function goToPrevQuestion() {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex--;
    renderQuestion();
  } else {
    showSection('name');
  }
}

// Scoring Logic
function calculateResults() {
  state.totalScore = 0;
  state.hasRedFlag = false;
  
  state.answers.forEach((answer, index) => {
    state.totalScore += answer.score;
    if (answer.isRedFlag) state.hasRedFlag = true;
    if (index === 0) state.recommenderRole = answer.text;
  });
  
  displayResults();
}

function displayResults() {
  let result;
  
  if (state.hasRedFlag || state.totalScore < resultCategories.COULD_WORK.minScore) {
    result = resultCategories.NOT_BEST_FIT;
  } else if (state.totalScore >= resultCategories.STRONG.minScore) {
    result = resultCategories.STRONG;
  } else {
    result = resultCategories.COULD_WORK;
  }
  
  // Generate Insights for the Detail View
  const insights = generateInsights(state.answers);
  
  // Save to Session with detailed data
  state.evaluatedRecommenders.push({
    name: state.currentRecommenderName,
    score: state.totalScore,
    label: result.label,
    meaning: result.meaning,
    nextSteps: result.nextSteps,
    checklist: result.checklist,
    extraGuidance: result.extraGuidance,
    insights: insights
  });
  
  // Update UI
  elements.evalTargetName.innerText = `Results for ${state.currentRecommenderName}`;
  elements.resultBadge.innerText = result.label;
  elements.resultBadge.className = 'badge ' + result.label.toLowerCase().replace(/ /g, '-');
  
  elements.resultMeaning.innerText = result.meaning;
  
  elements.resultNextSteps.innerHTML = result.nextSteps
    .map(step => `<li>${step}</li>`)
    .join('');
    
  elements.resultChecklist.innerHTML = result.checklist
    .map(item => `<li>${item}</li>`)
    .join('');
  
  // Extra Guidance Rendering Fix
  const extraContainer = document.getElementById('extra-guidance-container');
  const extraTitle = document.getElementById('extra-guidance-title');
  const extraSteps = document.getElementById('extra-guidance-steps');
  
  if (result.extraGuidance) {
    extraContainer.classList.remove('hidden');
    extraTitle.innerText = result.extraGuidance.title;
    extraSteps.innerHTML = result.extraGuidance.steps
      .map(step => `<li>${step}</li>`)
      .join('');
  } else {
    extraContainer.classList.add('hidden');
  }
    
  showSection('results');
}

function generateInsights(answers) {
  const strengths = [];
  const concerns = [];

  // Q2: How well
  if (answers[1].text === 'Very well') strengths.push('Has a deep personal or professional connection with you.');
  if (answers[1].text === 'Not very well') concerns.push('Connection might be too surface-level for a detailed letter.');

  // Q3: Context
  if (answers[2].text === 'Multiple contexts') strengths.push('Can speak to your abilities across different environments.');

  // Q4: Growth
  if (answers[3].text === 'Yes, over a long period') strengths.push('Has witnessed your long-term growth and consistency.');
  if (answers[3].text === 'No, it was a brief interaction') concerns.push('Limited observation window may result in a generic letter.');

  // Q5: Specificity
  if (answers[4].text === 'Yes, they can provide specific examples') strengths.push('Able to provide the vivid anecdotes that admissions officers value.');
  if (answers[4].text === 'No, they only know my basic info') concerns.push('May struggle to move beyond generic praise or basic facts.');

  // Q6: Recent
  if (answers[5].text === 'Yes, currently or within the last year') strengths.push('Can provide an up-to-date perspective on your current strengths.');
  if (answers[5].text === 'No, it\'s been several years') concerns.push('Insights might feel outdated to an admissions committee.');

  // Q7: Supportive
  if (answers[6].text === 'Yes, definitely') strengths.push('A genuine advocate who is likely to put in the extra effort.');
  if (answers[6].text === 'No, they seem too busy or unenthusiastic') concerns.push('Major risk: An unenthusiastic letter can be a significant red flag.');

  // Q8: Deadline
  if (answers[7].text === 'Urgent (less than 2 weeks)') concerns.push('Rushing a recommender often leads to a less thoughtful letter.');

  return { strengths, concerns };
}

function showRanking() {
  const sorted = [...state.evaluatedRecommenders].sort((a, b) => b.score - a.score);
  
  elements.rankingList.innerHTML = sorted.map((rec, index) => `
    <div class="ranking-card" id="rank-card-${index}">
      <div class="ranking-item clickable" onclick="toggleDetail(${index})">
        <div class="ranking-item-main">
          <h4>${rec.name}</h4>
          <p class="meaning-preview">${rec.meaning}</p>
        </div>
        <div class="ranking-item-score">
          <span class="badge ${rec.label.toLowerCase().replace(/ /g, '-')}">${rec.label}</span>
          <span class="score-number">SCORE: ${rec.score}</span>
        </div>
      </div>
      
      <div class="ranking-detail hidden" id="rank-detail-${index}">
        <div class="detail-grid">
          <div class="detail-column">
            <h5>Strengths</h5>
            <ul class="insight-list">
              ${rec.insights.strengths.length > 0 
                ? rec.insights.strengths.map(s => `<li>${s}</li>`).join('')
                : '<li>No major strengths identified for this choice.</li>'}
            </ul>
          </div>
          <div class="detail-column">
            <h5>Possible Concerns</h5>
            <ul class="insight-list">
              ${rec.insights.concerns.length > 0 
                ? rec.insights.concerns.map(c => `<li>${c}</li>`).join('')
                : '<li>No major concerns identified.</li>'}
            </ul>
          </div>
        </div>
        
        <div class="detail-summary">
          <h5>Suggested Next Step</h5>
          <p>${rec.nextSteps[0]}</p>
        </div>

        ${rec.extraGuidance ? `
          <div class="detail-extra-guidance">
            <h5>${rec.extraGuidance.title}</h5>
            <ul class="insight-list">
              ${rec.extraGuidance.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
  
  showSection('ranking');
}

function toggleDetail(index) {
  const detail = document.getElementById(`rank-detail-${index}`);
  const card = document.getElementById(`rank-card-${index}`);
  
  const isHidden = detail.classList.contains('hidden');
  
  // Close all others first for a clean accordion feel
  document.querySelectorAll('.ranking-detail').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.ranking-card').forEach(el => el.classList.remove('expanded'));
  
  if (isHidden) {
    detail.classList.remove('hidden');
    card.classList.add('expanded');
  }
}

function resetEverything() {
  if (confirm('This will clear all evaluations from this session. Are you sure?')) {
    state.evaluatedRecommenders = [];
    state.currentRecommenderName = '';
    elements.recommenderNameInput.value = '';
    showSection('home');
  }
}

// Global scope for onclick handlers
window.selectOption = selectOption;
window.toggleDetail = toggleDetail;

// Run init
init();
