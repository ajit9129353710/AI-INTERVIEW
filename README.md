🤖 InterviewAI – AI Voice Mock Interview Platform

🚀 Practice Smarter. Speak Confidently. Crack Your Interview.

InterviewAI is an AI-powered mock interview platform designed to help students and job seekers prepare for technical interviews.

The platform generates interview questions using Artificial Intelligence, allows users to answer questions through their microphone, and provides AI-powered feedback to improve their interview performance.

Practice. Improve. Get Interview Ready! 🎯

---

✨ Key Features

- 🤖 AI-Generated Questions – Generate interview questions based on your selected role.
- 🎤 Voice-Based Interviews – Answer interview questions using your microphone.
- 🔊 AI Voice Interaction – Listen to interview questions using speech synthesis.
- 🧠 AI Answer Evaluation – Analyze answers using Artificial Intelligence.
- 📊 Performance Feedback – Receive feedback and scores on your answers.
- 💻 Role-Based Interviews – Practice for different technical roles.
- 📚 Interview History – Review previous interview sessions.
- 🔐 User Authentication – Secure login and signup functionality.
- 📱 Responsive UI – Modern and user-friendly interface.

---

🛠️ Tech Stack

Technology| Purpose
React.js| Frontend
Vite| Development Tool
JavaScript| Programming Language
CSS| UI Styling
Node.js| Backend Runtime
Express.js| Backend Framework
MongoDB| Database
Mongoose| Database Modeling
Google Gemini API| AI Question Generation & Evaluation
JWT| Authentication
Web Speech API| Voice Recognition & Speech Synthesis
REST API| Client-Server Communication

---

📂 Project Structure

AI-MOCK-INTERVIEW/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── FeedbackCard.jsx
│   │   │   ├── VoiceAssistant.jsx
│   │   │   └── ScoreCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── History.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── server.js
│   └── package.json
│
└── README.md

---

⚙️ Installation & Setup

1. Clone Repository

git clone https://github.com/ajit9129353710/AI-MOCK-INTERVIEW.git

2. Navigate to Project

cd AI-MOCK-INTERVIEW

3. Backend Setup

cd backend
npm install

Create a ".env" file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key

Start Backend:

npm run dev

4. Frontend Setup

Open another terminal:

cd frontend
npm install

Create a ".env" file:

VITE_API_URL=http://localhost:5000

Start Frontend:

npm run dev

---

🧠 How It Works

1. User creates an account or logs in.
2. User selects an interview role.
3. AI generates a relevant interview question.
4. The question is presented to the user.
5. User answers through the microphone.
6. Speech Recognition converts voice into text.
7. The answer is sent to the AI evaluation system.
8. AI analyzes the answer and generates feedback.
9. User receives performance scores and suggestions.
10. Interview history helps users track their progress.

---

🎯 Project Objective

The main objective of InterviewAI is to create an intelligent interview preparation platform that helps candidates improve their technical knowledge, communication skills, and confidence.

Key Learning Outcomes

- Full Stack Web Development
- Artificial Intelligence Integration
- Gemini API Integration
- Voice Recognition
- Speech Synthesis
- AI-Based Answer Evaluation
- REST API Development
- MongoDB Database Management
- JWT Authentication
- Frontend and Backend Integration

---

👨‍💻 Developer

Ajit Prajapati

💻 Aspiring Full Stack Developer
🤖 AI Enthusiast
🎓 Computer Science & Data Science Student

Passionate about building AI-powered applications and solving real-world problems through modern web technologies.

---

⭐ Support

If you like this project, don't forget to give this repository a ⭐ on GitHub!

🎯 InterviewAI – Your Personal AI Interview Coach.
