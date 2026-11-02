import { Link, useNavigate } from "react-router-dom";
import {
BrainCircuit,
UserRound,
Mail,
ShieldCheck,
ArrowLeft,
LogOut,
CalendarDays,
LayoutDashboard,
Mic,
} from "lucide-react";
import "./Profile.css";

import { useAuth } from "../context/AuthContext";

function Profile() {
const navigate = useNavigate();
const { user, logout } = useAuth();

let savedUser = {};

try {
savedUser = JSON.parse(localStorage.getItem("user") || "{}");
} catch {
savedUser = {};
}

const currentUser = user || savedUser;

const name = currentUser?.name || "Interview User";
const email = currentUser?.email || "Email not available";

const memberSince = currentUser?.createdAt
? new Date(currentUser.createdAt).toLocaleDateString("en-IN", {
day: "numeric",
month: "long",
year: "numeric",
})
: "Information unavailable";

const handleLogout = () => {
logout();
};

return (
<div className="app">
<nav className="navbar">
<Link to="/" className="brand">
<span className="brand-icon">
<BrainCircuit size={24} />
</span>

      <span>
        Interview<span className="brand-highlight">AI</span>
      </span>
    </Link>

    <div className="nav-actions">
      <Link
        to="/dashboard"
        className="button button-outline button-small"
      >
        <ArrowLeft size={16} />
        Dashboard
      </Link>

      <button
        type="button"
        className="button button-outline button-small"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  </nav>

  <main className="profile-page">
    <div className="dashboard-header">
      <div>
        <h1>
          My <span className="gradient-text">Profile</span>
        </h1>

        <p>View your InterviewAI account information.</p>
      </div>
    </div>

    <section className="profile-card">
      <div className="profile-cover">
        <div className="profile-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="profile-main-info">
        <h2>{name}</h2>
        <p>{email}</p>

        <span className="profile-status">
          <ShieldCheck size={15} />
          InterviewAI Member
        </span>
      </div>

      <div className="profile-divider" />

      <div className="profile-details">
        <h3>Account Information</h3>

        <div className="profile-detail-row">
          <div className="profile-detail-icon">
            <UserRound size={20} />
          </div>

          <div>
            <span>Full Name</span>
            <strong>{name}</strong>
          </div>
        </div>

        <div className="profile-detail-row">
          <div className="profile-detail-icon">
            <Mail size={20} />
          </div>

          <div>
            <span>Email Address</span>
            <strong>{email}</strong>
          </div>
        </div>

        <div className="profile-detail-row">
          <div className="profile-detail-icon">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Member Since</span>
            <strong>{memberSince}</strong>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <Link
          to="/dashboard"
          className="button button-outline"
        >
          <LayoutDashboard size={17} />
          Go to Dashboard
        </Link>

        <Link
          to="/interview"
          className="button button-primary"
        >
          <Mic size={17} />
          Start Interview
        </Link>
      </div>
    </section>
  </main>
</div>

);
}

export default Profile;