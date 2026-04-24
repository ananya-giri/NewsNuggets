# 📰 NewsNugget – Agentic AI News Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

**NewsNugget** is an enterprise-grade MERN platform that transforms news consumption through **Agentic AI**. It doesn't just summarize news; it analyzes information integrity, detects bias, and provides multi-modal (audio) delivery in a high-end, glassmorphic interface.

---

## 💎 Premium Features

### 🧠 Agentic AI Pipeline
*   **Intelligent Summarization**: Powered by Gemini 1.5 Flash for high-speed, 3-point objective distillations.
*   **Deep Bias & Sentiment Analyzer**: Advanced orchestration detects Tone (e.g., Alarmist, Neutral), Sentiment, and provides a **0-10 Bias Score**.
*   **AI Magic Refine**: An agentic loop allowing users to "steer" the AI output via natural language instructions.

### 🎙️ Multi-Modal Experience
*   **Audio Nuggets**: Built-in Text-to-Speech (TTS) allowing users to listen to news summaries on the go.
*   **Dynamic Tagging**: Automated AI-generated meta-tags for better archival and searchability.

### 🌓 Next-Gen Aesthetics
*   **Glassmorphic UI**: A premium, translucent design system built for 2026 aesthetics.
*   **Adaptive Theme System**: Context-driven Dark/Light mode with persisted user preferences.
*   **Skeleton Loading**: Smooth UX transitions and optimized rendering.

---

## 💻 Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React 19, Tailwind v4, Axios | Reactive UI & State Management |
| **Backend** | Node.js, Express.js | Secure API Gateway & AI Orchestration |
| **AI Brain** | Google Gemini 1.5 Flash | LLM for Summarization & Analysis |
| **Database** | MongoDB Atlas | Personal Knowledge Archive |
| **Security** | JWT, Bcrypt, Rate Limiting | Auth & API Protection |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone and Install
```bash
git clone https://github.com/ananya-giri/NewsNuggets.git
cd NewsNuggets
```

### 2️⃣ Backend Configuration (`/server`)
Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_atlas_uri
NEWS_API_KEY=your_newsapi_key
GEMINI_API_KEY=your_google_ai_key
JWT_SECRET=your_jwt_secret
```
Run the server:
```bash
cd server
npm install
node index.js
```

### 3️⃣ Frontend Configuration (`/01newssum`)
The frontend is pre-configured to point to `localhost:5001`.
```bash
cd ../01newssum
npm install
npm run dev
```

---

## 🛡️ Security & Architecture
*   **Secured AI Layer**: All Gemini API calls are proxied through the backend to prevent API Key exposure in the client browser.
*   **Rate Limiting**: Custom middleware prevents API abuse for AI generation endpoints.
*   **JWT Authentication**: Secure user sessions with encrypted password hashing.

---

## 👨‍💻 Author
**Ananya Giri**  
*Aspiring Full-Stack & AI Engineer*  

📌 [LinkedIn](https://www.linkedin.com/in/ananyagiri/) | 📧 ananyagiri@example.com

---
📄 Licensed under MIT. AI features powered by Google Gemini.
