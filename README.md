# Skill Inheritance AI 🚀
### Enterprise Tacit Knowledge-Transfer & Skill Graph Platform

**Skill Inheritance AI** is an organizational knowledge-transfer platform that captures valuable skills, production experiences, problem-solving methods, and architectural wisdom from senior/experienced engineers and intelligently transfers that knowledge to junior engineers.

---

## 💡 The Core Vision

```
Senior Experience (Incidents & Postmortems)
        ↓
AI Knowledge Engine (Taxonomy, Problem & Solution Extraction)
        ↓
Interactive Skill Knowledge Graph & Risk Radar
        ↓
Junior Skill Gap Analysis (Org Demand vs Current Skills)
        ↓
Personalized 7-Day Roadmap
        ↓
Real-World Workplace Problem Simulator (With Expert Solution Links)
        ↓
Skill Inherited & Verified (+XP Gamification)
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Lucide React icons, Recharts, Framer Motion, Canvas-Confetti
- **Backend**: Node.js, Express.js, MongoDB (Mongoose models + resilient in-memory zero-setup mock cache fallback)
- **AI Service Abstraction**: Modular `aiService.js` supporting Google Gemini (`GEMINI_API_KEY`) and OpenAI (`OPENAI_API_KEY`) with a built-in Semantic Knowledge Engine that cites verified internal incident playbooks
- **Authentication**: JWT authentication with role-based access control (Admin, Senior/Mentor, Junior/Learner) and 1-Click Quick Demo Switchers

---

## ⚡ Quick Start & Running Locally

### 1. Install Dependencies
```bash
# In the root directory:
npm run install:all
```
*(Or navigate to `/server` and `/client` and run `npm install` in each)*

### 2. Run the Backend Server
```bash
cd server
npm start
```
- The server will run at: `http://localhost:5000`
- API Health Check: `http://localhost:5000/api/health`
- **Zero-Setup Guarantee**: If MongoDB is not running locally, the server automatically starts in resilient mock store mode.

### 3. Run the Frontend Client
```bash
cd client
npm run dev
```
- The frontend will open at: `http://localhost:3000`

---

## 🎯 5-Minute Hackathon Demo Flow Guide

Use the **Interactive 5-Minute Demo Tour Bar** at the top of the app to walk through the 14-step story:

1. **Step 1: Login as Senior (Arun Kumar)** — Click *Senior (Arun)* in top bar or login page.
2. **Step 2: Share Tacit Experience** — Navigate to *Share Experience*, submit *"Leave Approval Database Issue"*. Observe live AI skill & taxonomy extraction with 96% confidence.
3. **Step 3: Document Upload Ingestion** — Navigate to *Upload Document*, upload a technical runbook and watch the multi-step scanning animation.
4. **Step 4: Login as Junior (Kumar)** — Switch to *Junior (Kumar)* persona.
5. **Step 5: AI Skill Gap Intelligence** — View *AI Skill Gap Analysis* showing SQL (45%) & Debugging (40%) gaps with real-world incident reasoning.
6. **Step 6: Personalized 7-Day Roadmap** — Explore the generated milestone schedule with daily XP rewards.
7. **Step 7: Real-World Workplace Simulator** — Start the *Workplace Incident Challenge* for the Leave Approval bug.
8. **Step 8: Ask InheritAI Knowledge Bot** — Ask: *"How did previous developers solve database update problems?"* and observe direct citation of Arun Kumar's postmortem.
9. **Step 9: Solve Challenge & Inherit Skill** — Submit Option B (inspect SQL WHERE clause). Earn +50 XP and click *"Learn From Expert Solution"*.
10. **Step 10: Interactive Skill Knowledge Graph** — Click nodes in the full-screen graph to inspect experts, incidents, and solutions.
11. **Step 11: AI Mentor Matching** — Match with Arun Kumar based on skill similarity and send a 1:1 request.
12. **Step 12: Skill Inheritance Timeline** — View the lineage from 2022 Senior Learning $\to$ 2026 Junior Mastery.
13. **Step 13: Knowledge Decay Monitor** — Detect outdated legacy Payment SDKs (42% freshness) and request senior review.
14. **Step 14: Admin Critical Knowledge Risk** — Switch to *Admin* to view Single-Point-of-Failure (SPoF) risk reduction and knowledge transfer analytics.

---

## 🔒 Roles & Demo Accounts

| Role | Name | Email | Password | Access |
|---|---|---|---|---|
| **Senior / Mentor** | Arun Kumar | `arun@company.com` | `password123` | Experience Capture, Document Ingestion, Knowledge Engine, Mentorship |
| **Junior / Learner** | Kumar | `kumar@company.com` | `password123` | Skill Gap Analysis, 7-Day Roadmap, Real-World Simulator, InheritAI, Mentor Matching |
| **Admin** | Sophia Vance | `admin@company.com` | `password123` | Critical Knowledge Risk Radar, Decay Monitor, Skill Graph, Org Analytics |

---

## 📁 Repository Structure

```
skill/
├── client/                     # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/           # InheritAI Chatbot with Org Citations
│   │   │   ├── common/         # Navbar, Sidebar, StatCard, Modal, DemoGuideBanner
│   │   │   ├── graph/          # Interactive SVG Knowledge Graph
│   │   │   ├── simulator/      # Real-World Workplace Challenge Runner
│   │   │   └── timeline/       # Skill Inheritance Lineage Component
│   │   ├── context/            # Auth, Notification, Gamification Contexts
│   │   ├── pages/              # 17 Feature & Role Pages
│   │   ├── services/           # api.js REST Client
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/                     # Node.js + Express + MongoDB
    ├── src/
    │   ├── config/             # MongoDB config with mock fallback
    │   ├── controllers/        # REST API controllers
    │   ├── middleware/         # JWT Auth & Role guards
    │   ├── models/             # Mongoose Schemas (User, Experience, Skill, etc.)
    │   ├── routes/             # REST Endpoints
    │   ├── seed/               # Realistic enterprise seed dataset
    │   ├── services/           # aiService.js modular AI engine
    │   └── server.js
    └── package.json
```

---
*Built with ❤️ for High-Velocity Engineering Organizations.*
