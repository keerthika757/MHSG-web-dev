const API_URL = 'http://localhost:3001/feedbacks';

const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const feedbackInput = document.getElementById('feedback');
const feedbackList = document.getElementById('feedback-list');

function renderFeedbacks(feedbacks) {
  feedbackList.innerHTML = '';
  feedbacks.forEach(fb => {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.innerHTML = `
      <div class="feedback-meta"><strong>${fb.name}</strong> <span>(${new Date(fb.timestamp).toLocaleString()})</span></div>
      <div>${fb.feedback}</div>
    `;
    feedbackList.appendChild(div);
  });
}

async function loadFeedbacks() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderFeedbacks(data);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const feedback = feedbackInput.value.trim();
  if (!name || !feedback) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, feedback })
  });
  nameInput.value = '';
  feedbackInput.value = '';
  loadFeedbacks();
});

// Initial load
loadFeedbacks(); 