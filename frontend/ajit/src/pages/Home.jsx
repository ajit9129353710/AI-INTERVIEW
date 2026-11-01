import { Link } from "react-router-dom";
import {
BrainCircuit,
Sparkles,
ArrowRight,
Mic,
MessageSquare,
ChartNoAxesColumnIncreasing,
ShieldCheck,
Zap,
CheckCircle2,
Play,
Target,
Clock3,
Code2,
UserRound,
} from "lucide-react";

function Home() {
return (
<div className="app">
<div className="background-glow">
<div className="glow-one"></div>
<div className="glow-two"></div>
</div>

  <nav className="navbar">
    <Link to="/" className="brand">
      <span className="brand-icon">
        <BrainCircuit size={24} />
      </span>

      <span>
        Interview<span className="brand-highlight">AI</span>
      </span>
    </Link>

    <div className="nav-links">
      <a href="#features">Features</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#about">About</a>
    </div>

    <div className="nav-actions">
      <Link to="/login" className="login-link">
        Login
      </Link>

      <Link to="/signup" className="button button-primary button-small">
        Get Started <ArrowRight size={16} />
      </Link>
    </div>
  </nav>

  <section className="hero">
    <div className="hero-content">
      <div className="announcement">
        <Sparkles size={15} />
        AI-Powered Interview Preparation
        <ArrowRight size={14} />
      </div>

      <h1>
        Your Next Interview.
        <br />
        Your <span className="gradient-text">Best Performance.</span>
      </h1>

      <p className="hero-description">
        Practice real interview questions with AI, answer using your
        voice, and get instant feedback to improve your confidence
        and technical skills.
      </p>

      <div className="hero-actions">
        <Link to="/signup" className="button button-primary">
          Start Free Practice <ArrowRight size={18} />
        </Link>

        <a href="#how-it-works" className="button button-outline">
          <Play size={16} /> See How It Works
        </a>
      </div>

      <div className="trust-row">
        <span>
          <CheckCircle2 size={15} className="trust-icon" />
          AI Feedback
        </span>

        <span className="trust-dot"></span>

        <span>
          <CheckCircle2 size={15} className="trust-icon" />
          Voice Practice
        </span>

        <span className="trust-dot"></span>

        <span>
          <CheckCircle2 size={15} className="trust-icon" />
          Track Progress
        </span>
      </div>
    </div>

    <div className="hero-visual">
      <div className="visual-orbit orbit-one"></div>
      <div className="visual-orbit orbit-two"></div>

      <div className="ai-core">
        <div className="ai-core-inner">
          <BrainCircuit size={58} />
        </div>

        <span className="core-spark spark-one"></span>
        <span className="core-spark spark-two"></span>
      </div>

      <div className="floating-card card-top">
        <p>
          <span className="status-dot"></span>
          AI Interviewer
        </p>

        <strong>Ready to practice?</strong>

        <div className="mini-score">
          <span>Personalized questions</span>
          <Sparkles size={15} />
        </div>
      </div>

      <div className="floating-card card-bottom">
        <p>Your Performance</p>

        <strong>Keep improving!</strong>

        <div className="mini-score">
          <span>Instant AI feedback</span>
          <ChartNoAxesColumnIncreasing size={17} />
        </div>
      </div>

      <div className="visual-caption">
        Your personal AI interview coach
      </div>
    </div>
  </section>

  <section className="features-section" id="features">
    <div className="container">
      <div className="section-heading">
        <div className="announcement">
          <Sparkles size={14} />
          POWERED BY AI
        </div>

        <h2>
          Everything You Need to
          <br />
          <span className="gradient-text">Crack Your Interview</span>
        </h2>

        <p>
          Build confidence, practice technical questions, and discover
          where you can improve with your personal AI interview coach.
        </p>
      </div>

      <div className="features-grid">
        <article className="feature-card">
          <div className="feature-icon">
            <BrainCircuit size={25} />
          </div>

          <h3>AI Interview Questions</h3>

          <p>
            Practice role-specific interview questions generated
            according to your selected career path.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <Mic size={25} />
          </div>

          <h3>Voice-Based Practice</h3>

          <p>
            Speak your answers naturally and get comfortable
            explaining your ideas during interviews.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <MessageSquare size={25} />
          </div>

          <h3>Instant AI Feedback</h3>

          <p>
            Understand what you did well and learn how to improve
            your answers with practical suggestions.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <ChartNoAxesColumnIncreasing size={25} />
          </div>

          <h3>Performance Score</h3>

          <p>
            Receive a score for your answers and identify areas
            where you need more preparation.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <ShieldCheck size={25} />
          </div>

          <h3>Private Account</h3>

          <p>
            Sign in to your account and access your personalized
            interview practice and saved results.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <Zap size={25} />
          </div>

          <h3>Learn at Your Pace</h3>

          <p>
            Practice whenever you want, review your feedback,
            and keep working toward your career goals.
          </p>
        </article>
      </div>
    </div>
  </section>

  <section className="steps-section" id="how-it-works">
    <div className="container">
      <div className="section-heading">
        <h2>
          Start Practicing in
          <br />
          <span className="gradient-text">3 Simple Steps</span>
        </h2>

        <p>
          No complicated setup. Just sign in, practice, and improve.
        </p>
      </div>

      <div className="steps-grid">
        <article className="step-card">
          <div className="step-number">01</div>

          <h3>Create Your Account</h3>

          <p>
            Sign up for InterviewAI to access your personal
            interview preparation dashboard.
          </p>
        </article>

        <article className="step-card">
          <div className="step-number">02</div>

          <h3>Start Your Interview</h3>

          <p>
            Select your target role, receive an AI-generated question,
            and answer by typing or speaking.
          </p>
        </article>

        <article className="step-card">
          <div className="step-number">03</div>

          <h3>Get Feedback & Improve</h3>

          <p>
            Review your score, read AI feedback, and use the
            suggestions to prepare better answers.
          </p>
        </article>
      </div>
    </div>
  </section>
  <section className="features-section" id="about">
    <div className="container">
      <div className="section-heading">
        <div className="feature-icon" style={{ margin: "0 auto 20px" }}>
          <Target size={27} />
        </div>

        <h2>
          Prepare Smarter.
          <br />
          <span className="gradient-text">Perform Better.</span>
        </h2>

        <p>
          InterviewAI helps students and job seekers practice
          interview communication, strengthen technical knowledge,
          and prepare for their next career opportunity.
        </p>

        <div
          className="hero-actions"
          style={{ justifyContent: "center", marginTop: "25px" }}
        >
          <Link to="/signup" className="button button-primary">
            Create Free Account <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <article className="feature-card">
          <div className="feature-icon">
            <Code2 size={24} />
          </div>

          <h3>Technical Preparation</h3>

          <p>
            Prepare for technical interview questions relevant
            to your chosen developer role.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <Clock3 size={24} />
          </div>

          <h3>Practice Anytime</h3>

          <p>
            Use your available time to practice questions and
            gradually improve your interview readiness.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">
            <UserRound size={24} />
          </div>

          <h3>Built for Candidates</h3>

          <p>
            Prepare for internships, fresher placements, and
            your next software development opportunity.
          </p>
        </article>
      </div>
    </div>
  </section>

  <section className="cta-section">
    <div className="cta-box">
      <div className="announcement">
        <Sparkles size={15} />
        YOUR NEXT OPPORTUNITY STARTS HERE
      </div>

      <h2>
        Ready to Face Your
        <br />
        <span className="gradient-text">Next Interview?</span>
      </h2>

      <p>
        Start practicing with your AI interview coach and take
        the next step toward your career goals.
      </p>

      <Link to="/signup" className="button button-primary">
        Get Started Now <ArrowRight size={18} />
      </Link>
    </div>
  </section>

  <footer className="footer">
    <div className="footer-inner">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <BrainCircuit size={22} />
        </span>

        <span>
          Interview<span className="brand-highlight">AI</span>
        </span>
      </Link>

      <p>
        © {new Date().getFullYear()} InterviewAI. Built for your next
        opportunity.
      </p>

      <div className="footer-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  </footer>
</div>

);
}

export default Home;