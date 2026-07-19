const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (fast for demo, no DB setup needed)
let entries = [];

// Add a new waste log entry
app.post('/entries', (req, res) => {
  const { item, cookedKg, leftoverKg, day } = req.body;
  const entry = {
    id: Date.now(),
    item,
    cookedKg: Number(cookedKg),
    leftoverKg: Number(leftoverKg),
    wastePercent: ((Number(leftoverKg) / Number(cookedKg)) * 100).toFixed(1),
    day,
    date: new Date().toISOString().split('T')[0]
  };
  entries.push(entry);
  res.json(entry);
});

// Get all entries
app.get('/entries', (req, res) => {
  res.json(entries);
});

// Simple AI-style recommendation logic
app.get('/recommendations', (req, res) => {
  const itemStats = {};
  entries.forEach(e => {
    if (!itemStats[e.item]) itemStats[e.item] = [];
    itemStats[e.item].push(Number(e.wastePercent));
  });

  const recommendations = Object.entries(itemStats).map(([item, percents]) => {
    const avgWaste = percents.reduce((a, b) => a + b, 0) / percents.length;
    let suggestion = '';
    if (avgWaste > 20) {
      suggestion = `Reduce ${item} quantity by ~${Math.round(avgWaste - 10)}% — consistently over-cooked.`;
    } else if (avgWaste < 5) {
      suggestion = `${item} portioning is efficient. Keep current quantity.`;
    } else {
      suggestion = `${item} waste is moderate — minor reduction of ~5-10% recommended.`;
    }
    return { item, avgWastePercent: avgWaste.toFixed(1), suggestion };
  });

  res.json(recommendations);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});