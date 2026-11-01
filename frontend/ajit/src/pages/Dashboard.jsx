import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  LogOut,
  Mic,
  History,
  UserCircle,
  ArrowRight,
  Trophy,
  Target,
  Clock,
  AlertCircle,
  Sparkles,
  CalendarDays,
  Play,
  RefreshCw,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchInterviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/interview/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (active) {
          const data = response.data;

          const list = Array.isArray(data)
            ? data
            : data.interviews || [];

          setInterviews(list);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Interview history could not be loaded."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (token) {
      fetchInterviews();
    } else {
      setLoading(false);
      setError("Please log in again to view your dashboard.");
    }

    return () => {
      active = false;
    };
  }, [token]);

  const getScore = (interview) => {
    if (typeof interview.totalScore === "number") {
      return interview.totalScore;
    }

    if (typeof interview.score === "number") {
      return interview.score;
    }

    return null;
  };

  const scoredInterviews = interviews.filter(
    (interview) => getScore(interview) !== null
  );

  const totalInterviews = interviews.length;

  const averageScore = scoredInterviews.length
    ? Math.round(
        scoredInterviews.reduce(
          (total, interview) => total + getScore(interview),
          0
        ) / scoredInterviews.length
      )
    : 0;

  const latestScore = interviews.length
    ? getScore(interviews[0])
    : null;

  const getInterviewTitle = (interview) =>
    interview.role ||
    interview.jobRole ||
    interview.title ||
    "Mock Interview";

  const getInterviewDate = (interview) => {
    const date = interview.createdAt || interview.date;

    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="premium-dashboard">
      {/* Navigation */}
      <nav className="premium-dashboard-nav">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <BrainCircuit size={23} />
          </span>

          <span>
            Interview<span className="brand-highlight">AI</span>
          </span>
        </Link>

        <div className="premium-nav-right">
          <span className="premium-online-badge">
            <span className="premium-online-dot" />
            AI Platform
          </span>

          <Link
            to="/profile"
            className="premium-icon-button"
            title="Profile"
            aria-label="Open profile"
          >
            <UserCircle size={19} />
          </Link>

          <button
            type="button"
            className="premium-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="premium-dashboard-container">
        <section className="premium-welcome">
          <div className="premium-welcome-content">
            <span className="premium-welcome-tag">
              <Sparkles size={14} />
              YOUR AI CAREER COMPANION
            </span>

            <h1>
              Welcome back,
              <br />
              <span className="brand-highlight">
                {user?.name || "Future Developer"}!
              </span>
            </h1>

            <p className="premium-welcome-email">
              Ready to improve your interview skills? Let's practice
              and get one step closer to your dream job.
            </p>

            <div className="premium-welcome-actions">
              <Link
                to="/interview"
                className="premium-primary-button"
              >
                <Mic size={18} />
                Start Mock Interview
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/history"
                className="premium-secondary-button"
              >
                <History size={17} />
                View History
              </Link>
            </div>
          </div>

          <div
            className="premium-welcome-visual"
            aria-hidden="true"
          >
            <div className="premium-visual-ring premium-ring-one" />
            <div className="premium-visual-ring premium-ring-two" />

            <div className="premium-visual-core">
              <BrainCircuit size={49} />
            </div>

            <span className="premium-visual-spark spark-one">
              ✦
            </span>

            <span className="premium-visual-spark spark-two">
              ✧
            </span>

            <div className="premium-floating-card premium-floating-top">
              <span className="premium-floating-icon">
                <Target size={16} />
              </span>

              <span>
                <strong>Practice</strong>
                <small>Build confidence</small>
              </span>
            </div>

            <div className="premium-floating-card premium-floating-bottom">
              <span className="premium-floating-icon">
                <Trophy size={16} />
              </span>

              <span>
                <strong>{totalInterviews} Sessions</strong>
                <small>Your progress</small>
              </span>
            </div>
          </div>
        </section>

        <section className="premium-stats-section">
          <div className="premium-section-heading">
            <div>
              <span className="section-label">
                YOUR PERFORMANCE
              </span>
              <h2>Dashboard Overview</h2>
              <p>Track your interview preparation progress.</p>
            </div>

            <span className="premium-date-badge">
              <CalendarDays size={15} />
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="premium-stats-grid">
            <article className="premium-stat-card purple-stat">
              <div className="premium-stat-top">
                <span className="premium-stat-icon">
                  <Mic size={21} />
                </span>

                <span className="premium-stat-label">
                  Total Interviews
                </span>
              </div>

              <div className="premium-stat-value">
                {loading ? "—" : totalInterviews}
              </div>

              <p>Practice sessions completed</p>

              <div className="premium-stat-decoration" />
            </article>

            <article className="premium-stat-card cyan-stat">
              <div className="premium-stat-top">
                <span className="premium-stat-icon">
                  <Target size={21} />
                </span>

                <span className="premium-stat-label">
                  Average Score
                </span>
              </div>

              <div className="premium-stat-value">
                {loading
                  ? "—"
                  : scoredInterviews.length
                    ? `${averageScore}%`
                    : "—"}
              </div>

              <p>Across scored interviews</p>

              <div className="premium-stat-decoration" />
            </article>

            <article className="premium-stat-card gold-stat">
              <div className="premium-stat-top">
                <span className="premium-stat-icon">
                  <Trophy size={21} />
                </span>

                <span className="premium-stat-label">
                  Latest Score
                </span>
              </div>

              <div className="premium-stat-value">
                {loading
                  ? "—"
                  : latestScore !== null
                    ? `${latestScore}%`
                    : "—"}
              </div>

              <p>Most recent interview result</p>

              <div className="premium-stat-decoration" />
            </article>
          </div>
        </section>

        <section className="premium-recent-section">
          <div className="premium-recent-header">
            <div>
              <h2 className="premium-section-title">
                Recent Interviews
              </h2>

              <p className="premium-section-subtitle">
                Review your latest practice sessions.
              </p>
            </div>

            <Link to="/history" className="premium-view-all">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading && (
            <div className="premium-loading">
              <RefreshCw
                size={19}
                className="premium-loading-icon"
              />
              Loading your interview history...
            </div>
          )}

          {!loading && error && (
            <div className="premium-error">
              <AlertCircle size={19} />
              <span>{error}</span>
              <button
                type="button"
                className="premium-secondary-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && interviews.length === 0 && (
            <div className="premium-empty-state">
              <div className="premium-empty-icon">
                <BrainCircuit size={29} />
              </div>

              <h3>Your journey starts here!</h3>

              <p>
                You haven't completed an interview yet. Start your
                first AI mock interview and track your progress here.
              </p>

              <Link
                to="/interview"
                className="premium-primary-button"
              >
                <Play size={17} />
                Start Your First Interview
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {!loading && !error && interviews.length > 0 && (
            <div className="premium-interview-list">
              {interviews.slice(0, 5).map((interview, index) => {
                const score = getScore(interview);

                return (
                  <article
                    className="premium-interview-item"
                    key={
                      interview._id ||
                      interview.id ||
                      `${getInterviewTitle(interview)}-${index}`
                    }
                  >
                    <div className="premium-interview-icon">
                      <BrainCircuit size={22} />
                    </div>

                    <div className="premium-interview-details">
                      <h3 className="premium-interview-title">
                        {getInterviewTitle(interview)}
                      </h3>

                      <div className="premium-interview-meta">
                        <span>
                          <Clock size={13} />{" "}
                          {getInterviewDate(interview)}
                        </span>

                        <span>
                          <Mic size={13} /> AI Mock Interview
                        </span>
                      </div>
                    </div>

                    <div className="premium-interview-score">
                      {score !== null ? `${score}%` : "—"}
                      <span className="premium-score-label">
                        Score
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <section className="premium-quick-actions">
          <Link to="/interview" className="premium-quick-card">
            <div className="premium-quick-icon">
              <Mic size={23} />
            </div>

            <div>
              <h3>Practice Interview</h3>
              <p>Answer AI-generated questions and improve your skills.</p>
            </div>

            <ArrowRight size={18} />
          </Link>

          <Link to="/history" className="premium-quick-card">
            <div className="premium-quick-icon">
              <History size={23} />
            </div>

            <div>
              <h3>Interview History</h3>
              <p>Review previous interviews and check your scores.</p>
            </div>

            <ArrowRight size={18} />
          </Link>
        </section>
        <footer className="premium-dashboard-footer">
          <p>
            © {new Date().getFullYear()} InterviewAI · Keep learning.
            Keep improving.
          </p>
        </footer>
      </div>
    </main>
  );
}