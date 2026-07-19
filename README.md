# 🍽️ MessWatch — AI-Powered Food Waste Tracking for Hostel Mess Management

## Problem
Hostel mess kitchens over-cook food daily due to guesswork, leading to massive food waste, wasted money, and environmental impact. No system tracks or analyzes this waste.

## Solution
MessWatch lets mess staff log cooked vs leftover quantities daily. AI analyzes patterns over time and generates actionable recommendations to reduce over-cooking — saving cost and reducing environmental impact.

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- AI Logic: Pattern-based waste analysis & recommendation engine

## Features
- Daily waste entry logging (item, cooked kg, leftover kg, day)
- Auto waste % calculation
- AI-generated recommendations per item based on historical waste trends
- Clean dashboard UI

## Setup Instructions

### Backend
\`\`\`bash
cd server
npm install
node index.js
\`\`\`
Runs on http://localhost:5000

### Frontend
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
Runs on http://localhost:5173

## Team
Built by Varma Kadali for [Hackathon Name]