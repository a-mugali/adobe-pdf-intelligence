const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());

// Serve static files in the 'output' directory
app.use(express.static(path.join(__dirname, 'output')));

// Serve sample.json explicitly
app.get('/sample.json', (req, res) => {
  const filePath = path.join(__dirname, 'output/sample.json');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'sample.json not found' });
  }
});

// Serve persona_output.json explicitly
app.get('/persona_output.json', (req, res) => {
  const filePath = path.join(__dirname, 'output/persona_output.json');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'persona_output.json not found' });
  }
});

// Catch-all for debugging
app.get('*', (req, res) => {
  res.status(404).send('❌ Not found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
