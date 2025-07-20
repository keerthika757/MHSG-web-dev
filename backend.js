const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory feedback storage
let feedbacks = [];

// Get all feedbacks (newest first)
app.get('/feedbacks', (req, res) => {
  res.json(feedbacks.slice().reverse());
});

// Post new feedback
app.post('/feedbacks', (req, res) => {
  const { name, feedback } = req.body;
  if (!name || !feedback) {
    return res.status(400).json({ error: 'Name and feedback are required.' });
  }
  const entry = {
    name,
    feedback,
    timestamp: new Date().toISOString(),
  };
  feedbacks.push(entry);
  res.status(201).json(entry);
});

app.listen(PORT, () => {
  console.log(`Feedback backend running on http://localhost:${PORT}`);
}); 