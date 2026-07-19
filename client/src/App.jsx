import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'https://messwatch-backend.onrender.com';

function App() {
  const [entries, setEntries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [form, setForm] = useState({ item: '', cookedKg: '', leftoverKg: '', day: 'Monday' });

  const fetchData = async () => {
    const entriesRes = await axios.get(`${API}/entries`);
    setEntries(entriesRes.data);
    const recRes = await axios.get(`${API}/recommendations`);
    setRecommendations(recRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/entries`, form);
    setForm({ item: '', cookedKg: '', leftoverKg: '', day: 'Monday' });
    fetchData();
  };

  return (
    <div className="dashboard">
      <header>
        <h1>🍽️ MessWatch</h1>
        <p>AI-Powered Food Waste Tracking for Hostel Mess Management</p>
      </header>

      <section className="form-section">
        <h2>Log Today's Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Item (e.g. Rice)"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Cooked (kg)"
            value={form.cookedKg}
            onChange={(e) => setForm({ ...form, cookedKg: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Leftover (kg)"
            value={form.leftoverKg}
            onChange={(e) => setForm({ ...form, leftoverKg: e.target.value })}
            required
          />
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button type="submit">Add Entry</button>
        </form>
      </section>

      <section className="table-section">
        <h2>Waste Log</h2>
        <table>
          <thead>
            <tr><th>Date</th><th>Day</th><th>Item</th><th>Cooked (kg)</th><th>Leftover (kg)</th><th>Waste %</th></tr>
          </thead>
          <tbody>
            {entries.map(e => (
              <tr key={e.id}>
                <td>{e.date}</td>
                <td>{e.day}</td>
                <td>{e.item}</td>
                <td>{e.cookedKg}</td>
                <td>{e.leftoverKg}</td>
                <td className={e.wastePercent > 20 ? 'high-waste' : ''}>{e.wastePercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ai-section">
        <h2>🤖 AI Recommendations</h2>
        {recommendations.length === 0 && <p>Add entries to see AI recommendations.</p>}
        {recommendations.map(r => (
          <div key={r.item} className="rec-card">
            <strong>{r.item}</strong> — Avg Waste: {r.avgWastePercent}%
            <p>{r.suggestion}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;