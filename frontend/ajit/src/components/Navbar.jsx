import { Link, NavLink, useNavigate } from "react-router-dom";
import {
BrainCircuit,
LayoutDashboard,
Mic,
History,
UserRound,
LogOut,
LogIn,
UserPlus,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
const { isAuthenticated, logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
logout();
};

return (
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
    {isAuthenticated ? (
      <>
        <NavLink to="/dashboard">
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink to="/interview">
          <Mic size={16} />
          Interview
        </NavLink>

        <NavLink to="/history">
          <History size={16} />
          History
        </NavLink>

        <NavLink to="/profile">
          <UserRound size={16} />
          Profile
        </NavLink>
      </>
    ) : (
      <>
        <NavLink to="/login">
          <LogIn size={16} />
          Login
        </NavLink>

        <NavLink to="/signup">
          <UserPlus size={16} />
          Sign Up
        </NavLink>
      </>
    )}
  </div>

  <div className="nav-actions">
    {isAuthenticated ? (
      <button
        type="button"
        className="button button-outline button-small"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        Logout
      </button>
    ) : (
      <Link
        to="/signup"
        className="button button-primary button-small"
      >
        Get Started
      </Link>
    )}
  </div>
</nav>

);
}

export default Navbar;