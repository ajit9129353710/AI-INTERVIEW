import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  ArrowLeft,
  Clock,
  Trophy,
  MessageSquare,
  RefreshCw,
  LogOut,
  History as HistoryIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  CalendarDays,
} from "lucide-react";
import api from "../services/api";

function History() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/api/interview/history", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = response.data;
        setInterviews(
          Array.isArray(data) ? data : data.interviews || []
        );
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load interview history. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const totalInterviews = interviews.length;

  const averageScore =
    totalInterviews > 0
      ? (
          interviews.reduce(
            (total, interview) =>
              total + Number(interview.totalScore || 0),
            0
          ) / totalInterviews
        ).toFixed(1)
      : "0.0";

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreLabel = (score) => {
    const value = Number(score || 0);

    if (value >= 8) return "Excellent";
    if (value >= 6) return "Good Progress";
    if (value >= 4) return "Keep Practicing";

    return "Room to Improve";
  };

  return (
    <div className="history-page-wrapper">
      <nav className="history-navbar">
        <Link to="/" className="history-brand">
          <span className="history-brand-icon">
            <BrainCircuit size={23} />
          </span>

          <span>
            Interview<span className="history-brand-highlight">AI</span>
          </span>
        </Link>

        <div className="history-nav-actions">
          <Link to="/dashboard" className="history-nav-button">
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </Link>

          <button
            type="button"
            className="history-nav-button history-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="history-main">
        <section className="history-hero">
          <div className="history-hero-content">
            <div className="history-eyebrow">
              <Sparkles size={15} />
              YOUR LEARNING JOURNEY
            </div>

            <h1>
              Interview <span>History</span>
            </h1>

            <p>
              Track your performance, review AI feedback, and discover
              how much you have improved with every interview.
            </p>

            <div className="history-hero-note">
              <Target size={17} />
              <span>Practice consistently. Improve confidently.</span>
            </div>
          </div>

          <div className="history-hero-visual">
            <div className="history-orbit history-orbit-one" />
            <div className="history-orbit history-orbit-two" />

            <div className="history-hero-brain">
              <BrainCircuit size={64} strokeWidth={1.4} />
            </div>

            <div className="history-floating-icon history-floating-top">
              <Trophy size={20} />
            </div>

            <div className="history-floating-icon history-floating-bottom">
              <MessageSquare size={20} />
            </div>
          </div>
        </section>

        <section className="history-stats-grid">
          <article className="history-stat-card">
            <div className="history-stat-top">
              <div className="history-stat-icon history-icon-purple">
                <HistoryIcon size={23} />
              </div>

              <span className="history-stat-badge">ALL TIME</span>
            </div>

            <p className="history-stat-label">Total Interviews</p>

            <div className="history-stat-value">
              {loading ? "..." : totalInterviews}
            </div>

            <p className="history-stat-description">
              Your completed practice sessions
            </p>
          </article>

          <article className="history-stat-card">
            <div className="history-stat-top">
              <div className="history-stat-icon history-icon-cyan">
                <Trophy size={23} />
              </div>

              <span className="history-stat-badge">AVERAGE</span>
            </div>

            <p className="history-stat-label">Average Score</p>

            <div className="history-stat-value">
              {loading ? "..." : averageScore}
              <span className="history-score-out-of">/10</span>
            </div>

            <p className="history-stat-description">
              Average score across your saved interviews
            </p>
          </article>

          <article className="history-stat-card">
            <div className="history-stat-top">
              <div className="history-stat-icon history-icon-green">
                <CheckCircle2 size={23} />
              </div>

              <span className="history-stat-badge">PROGRESS</span>
            </div>

            <p className="history-stat-label">Questions Practiced</p>

            <div className="history-stat-value">
              {loading
                ? "..."
                : interviews.reduce(
                    (total, interview) =>
                      total + (interview.questions || []).length,
                    0
                  )}
            </div>

            <p className="history-stat-description">
              Questions across all saved sessions
            </p>
          </article>
        </section>

        <section className="history-sessions-section">
          <div className="history-section-heading">
            <div>
              <div className="history-section-eyebrow">
                <Clock size={15} />
                YOUR ACTIVITY
              </div>

              <h2>
                Previous <span>Sessions</span>
              </h2>

              <p>Revisit your answers and learn from your AI feedback.</p>
            </div>

            <Link to="/interview" className="history-practice-button">
              <RefreshCw size={17} />
              Practice Again
            </Link>
          </div>

          {loading ? (
            <div className="history-state-card">
              <div className="history-loading-spinner" />

              <h3>Loading your history...</h3>

              <p>Getting your previous interview sessions ready.</p>
            </div>
          ) : error ? (
            <div className="history-state-card history-error-state">
              <div className="history-state-icon">
                <AlertCircle size={28} />
              </div>

              <h3>Unable to Load History</h3>

              <p>{error}</p>

              <button
                type="button"
                className="history-practice-button"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={17} />
                Try Again
              </button>
            </div>
          ) : totalInterviews === 0 ? (
            <div className="history-state-card">
              <div className="history-state-icon">
                <MessageSquare size={29} />
              </div>

              <h3>No Interviews Yet</h3>

              <p>
                Your completed interviews will appear here. Start your
                first AI mock interview and begin tracking your progress.
              </p>

              <Link to="/interview" className="history-practice-button">
                <Sparkles size={17} />
                Start Your First Interview
              </Link>
            </div>
          ) : (
            <div className="history-sessions-list">
              {interviews.map((interview, index) => {
                const score = Number(interview.totalScore || 0);
                const safeScore = Math.min(
                  10,
                  Math.max(0, score)
                );

                return (
                  <article
                    className="history-session-card"
                    key={interview._id || index}
                  >
                    <div className="history-session-header">
                      <div className="history-session-title-group">
                        <div className="history-session-number">
                          <BrainCircuit size={23} />
                        </div>

                        <div>
                          <h3>
                            {interview.role || "Interview Practice"}
                          </h3>

                          <p className="history-session-date">
                            <CalendarDays size={15} />
                            {formatDate(interview.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="history-session-score">
                        <span className="history-score-number">
                          {score}
                        </span>

                        <span className="history-score-out-of">
                          / 10
                        </span>

                        <span className="history-score-label">
                          {getScoreLabel(score)}
                        </span>
                      </div>
                    </div>

                    <div className="history-score-track">
                      <div
                        className="history-score-fill"
                        style={{ width: `${safeScore * 10}%` }}
                      />
                    </div>

                    <div className="history-session-summary">
                      <div>
                        <MessageSquare size={17} />
                        <span>
                          {(interview.questions || []).length} Questions
                        </span>
                      </div>

                      <div>
                        <CheckCircle2 size={17} />
                        <span>AI Evaluation</span>
                      </div>
                    </div>

                    <div className="history-question-list">
                      {(interview.questions || []).map((item, questionIndex) => (
                        <div
                          className="history-question-item"
                          key={questionIndex}
                        >
                          <div className="history-question-heading">
                            <span className="history-question-number">
                              QUESTION {String(questionIndex + 1).padStart(2, "0")}
                            </span>

                            <span className="history-question-score">
                              <Trophy size={14} />
                              {item.score ?? 0}/10
                            </span>
                          </div>

                          <h4>{item.question || "Question unavailable"}</h4>

                          <div className="history-answer-box">
                            <span className="history-content-label">
                              YOUR ANSWER
                            </span>

                            <p>
                              {item.answer || "No answer saved for this question."}
                            </p>
                          </div>

                          {item.feedback && (
                            <div className="history-feedback-box">
                              <span className="history-content-label">
                                <Sparkles size={14} />
                                AI FEEDBACK
                              </span>

                              <p>{item.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="history-footer">
          <BrainCircuit size={18} />
          <span>
            InterviewAI — Every practice session brings you one step closer
            to your dream role.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default History;