import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  Mic,
  MicOff,
  Send,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  LogOut,
  Volume2,
} from "lucide-react";

import api from "../services/api";

function Interview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Full Stack Developer");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const getToken = () => localStorage.getItem("token");

  const getHeaders = () => {
    const token = getToken();

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const handleAuthError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setError("Your session has expired. Please login again.");
      navigate("/login", { replace: true });

      return true;
    }

    return false;
  };

  const generateQuestion = async () => {
    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setError("");
      setFeedback(null);
      setAnswer("");
      setLoadingQuestion(true);

      const response = await api.post(
        "/api/interview/question",
        {
          role,
          previousQuestions,
        },
        {
          headers: getHeaders(),
        }
      );

      const newQuestion = response.data.question;

      if (!newQuestion) {
        throw new Error(
          "AI did not return a question. Please try again."
        );
      }

      setQuestion(newQuestion);

      setPreviousQuestions((previous) => [
        ...previous,
        newQuestion,
      ]);
    } catch (err) {
      if (handleAuthError(err)) return;

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to generate a question. Please try again."
      );
    } finally {
      setLoadingQuestion(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Voice input is not supported in this browser. Please use Chrome or type your answer."
      );
      return;
    }

    try {
      setError("");

      const recognition = new SpeechRecognition();

      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;

        setAnswer((previous) =>
          previous
            ? `${previous} ${transcript}`
            : transcript
        );
      };

      recognition.onerror = (event) => {
        setError(
          `Microphone error: ${event.error}. You can type your answer instead.`
        );
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    } catch {
      setListening(false);
      setError(
        "Unable to start the microphone. Please check browser permissions."
      );
    }
  };

  const speakQuestion = () => {
    if (!question || !("speechSynthesis" in window)) {
      setError(
        "Question audio is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(question);
    speech.lang = "en-IN";
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
  };

  const submitAnswer = async () => {
    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (!question) {
      setError("Please generate a question first.");
      return;
    }

    if (!answer.trim()) {
      setError("Please speak or type your answer first.");
      return;
    }

    try {
      setError("");
      setLoadingFeedback(true);

      const response = await api.post(
        "/api/interview/evaluate",
        {
          role,
          question,
          answer: answer.trim(),
        },
        {
          headers: getHeaders(),
        }
      );

      setFeedback(response.data);
    } catch (err) {
      if (handleAuthError(err)) return;

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to evaluate your answer. Please try again."
      );
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setQuestion("");
    setAnswer("");
    setFeedback(null);
    setPreviousQuestions([]);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    navigate("/login", { replace: true });
  };

  return (
    <main className="interview-page">
      <header className="interview-navbar">
        <Link to="/dashboard" className="brand">
          <span className="brand-icon">
            <BrainCircuit size={24} />
          </span>

          <span>
            Interview
            <span className="brand-highlight">AI</span>
          </span>
        </Link>

        <div className="interview-nav-actions">
          <Link to="/dashboard" className="interview-back-link">
            <ArrowLeft size={17} />
            Dashboard
          </Link>

          <button
            type="button"
            className="button interview-logout"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <section className="interview-container">
        <div className="interview-page-heading">
          <span className="section-label">
            <Sparkles size={15} />
            AI-POWERED PRACTICE
          </span>

          <h1>
            AI Mock <span className="hero-gradient">Interview</span>
          </h1>

          <p>
            Practice answering questions and get feedback to
            improve your interview performance.
          </p>
        </div>

        <section className="interview-settings">
          <label htmlFor="role">
            Choose your interview role
          </label>

          <div className="interview-role-row">
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
            >
              <option>Full Stack Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>React Developer</option>
              <option>Java Developer</option>
              <option>JavaScript Developer</option>
              <option>AI Full Stack Developer</option>
              <option>Data Analyst</option>
            </select>

            <button
              type="button"
              className="button"
              onClick={generateQuestion}
              disabled={loadingQuestion || loadingFeedback}
            >
              {loadingQuestion ? (
                <>
                  <RefreshCw className="spin-icon" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {question ? "Next Question" : "Start Interview"}
                </>
              )}
            </button>
          </div>
        </section>

        {error && (
          <div className="interview-error" role="alert">
            {error}
          </div>
        )}

        {!question && (
          <section className="interview-empty">
            <div className="interview-ai-icon">
              <BrainCircuit size={38} />
            </div>

            <h2>Ready to practice?</h2>

            <p>
              Choose your role and click Start Interview to get
              your first AI-generated question.
            </p>
          </section>
        )}

        {question && (
          <>
            <section className="interview-question-card">
              <div className="interview-card-top">
                <div className="interviewer-avatar">
                  <BrainCircuit size={25} />
                </div>

                <div>
                  <h2>AI Interviewer</h2>
                  <p>{role} Interview</p>
                </div>

                <button
                  type="button"
                  className="icon-button"
                  onClick={speakQuestion}
                  title="Listen to question"
                  aria-label="Listen to question"
                >
                  <Volume2 size={21} />
                </button>
              </div>

              <div className="interview-question-body">
                <span className="question-label">
                  QUESTION {previousQuestions.length}
                </span>

                <h3>{question}</h3>
              </div>
            </section>

            {!feedback && (
              <section className="interview-answer-card">
                <div className="answer-card-heading">
                  <h2>Your Answer</h2>
                  <span>Voice or text</span>
                </div>

                <textarea
                  value={answer}
                  onChange={(event) =>
                    setAnswer(event.target.value)
                  }
                  placeholder="Click the microphone to speak, or type your answer here..."
                  rows={7}
                  disabled={loadingFeedback}
                />

                <div className="answer-actions">
                  <button
                    type="button"
                    className={`button voice-button ${
                      listening ? "listening-button" : ""
                    }`}
                    onClick={startVoiceInput}
                    disabled={listening || loadingFeedback}
                  >
                    {listening ? (
                      <>
                        <MicOff size={18} />
                        Listening...
                      </>
                    ) : (
                      <>
                        <Mic size={18} />
                        Answer with Voice
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="button"
                    onClick={submitAnswer}
                    disabled={
                      loadingFeedback || !answer.trim()
                    }
                  >
                    {loadingFeedback ? (
                      <>
                        <RefreshCw
                          className="spin-icon"
                          size={18}
                        />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Answer
                      </>
                    )}
                  </button>
                </div>

                <p className="voice-help">
                  Allow microphone access when your browser asks
                  for permission. You can also type your answer.
                </p>
              </section>
            )}

            {feedback && (
              <section className="interview-feedback-card">
                <div className="feedback-result-heading">
                  <div>
                    <span className="section-label">
                      AI EVALUATION
                    </span>

                    <h2>Your Interview Feedback</h2>
                  </div>

                  <div className="interview-score">
                    <strong>{feedback.score ?? 0}</strong>
                    <span>/ 10</span>
                  </div>
                </div>

                <div className="feedback-result-section">
                  <h3>Feedback</h3>
                  <p>
                    {feedback.feedback || "No feedback returned."}
                  </p>
                </div>

                <div className="feedback-result-section">
                  <h3>Improved Answer</h3>
                  <p>
                    {feedback.improvedAnswer ||
                      "No improved answer returned."}
                  </p>
                </div>

                <div className="feedback-result-section">
                  <h3>What to Improve</h3>
                  <p>
                    {feedback.nextSuggestion ||
                      "Keep practicing to improve your answer."}
                  </p>
                </div>

                <button
                  type="button"
                  className="button next-question-button"
                  onClick={generateQuestion}
                  disabled={loadingQuestion}
                >
                  {loadingQuestion ? (
                    <>
                      <RefreshCw
                        className="spin-icon"
                        size={18}
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowLeft
                        size={18}
                        className="next-arrow-icon"
                      />
                    </>
                  )}
                </button>

                <p className="saved-message">
                  Your evaluation has been sent to the backend.
                  Check Interview History to confirm it was saved.
                </p>
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Interview;