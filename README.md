# 📰 NewsNugget – Your AI-Powered News Summarizer

**NewsNugget** is a full-stack MERN (MongoDB, Express, React, Node.js) application that delivers real-time news articles by category and summarizes them using Google's Gemini AI. Built for speed, clarity, and modern browsing, it helps users grasp the essence of breaking stories in seconds.

---

## 🔗 Live Demo

🌍 **Frontend**: (https://newsnuggets-f.onrender.com/)
⚙️ **Backend API**: [(https://newsnugget-backend.onrender.com)]

---

## 🚀 Features

- 📡 Fetches real-time news using **NewsAPI**
- 🧠 Summarizes articles using **Gemini Pro (Google AI)**
- 🗂 Save & manage AI summaries in **MongoDB Atlas**
- 🛡 API keys are **securely stored in environment variables**
- 🧾 Responsive UI built with **React + Tailwind CSS**
- 🔁 Deployed full-stack on **Render**

---

## 💻 Tech Stack

| Layer         | Tech Used                            |
|---------------|--------------------------------------|
| Frontend      | React, Tailwind CSS, Axios           |
| Backend       | Express.js, Node.js, dotenv          |
| AI Summarizer | Gemini Pro API (Generative AI)       |
| News Source   | NewsAPI.org                          |
| Database      | MongoDB Atlas (Mongoose ODM)         |
| Hosting       | Render (Static Site + Web Service)   |

---


## 🛠️ Setup Instructions (Local)

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/ananya-giri/NewsNuggets.git
cd NewsNuggets


2️⃣ Backend Setup (/server)

cd server
npm install

Create a .env file inside server/:
MONGO_URI=your_mongodb_atlas_uri
NEWS_API_KEY=your_newsapi_key


Start server:

node index.js


3️⃣ Frontend Setup (/01newssum)

cd ../01newssum
npm install


Create a .env file inside 01newssum/:

VITE_GEMINI_API_KEY=your_gemini_api_key


Start client:
npm run dev


🔐 Security Notes
🔒 NEWS_API_KEY is not exposed to the browser — it's called via the backend proxy

🔑 GEMINI_API_KEY is used client-side via VITE_ prefix, not pushed to GitHub

🗂 .env is gitignored

✨ Future Enhancements
✅ Add user authentication (Google login)

🔍 Search & filter saved summaries

📱 Make mobile-first version

🌐 Deploy to custom domain (e.g. newsnugget.ai)

👩‍💻 Author
Ananya Giri
📌 Aspiring Full-Stack Developer

📄 License
This project is licensed under the MIT License.
AI features powered by Google's Gemini Pro API.

