import { NavLink, useNavigate } from "react-router-dom";
import {
BrainCircuit,
LayoutDashboard,
Mic,
History,
UserRound,
Settings,
LogOut,
X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen = true, onClose }) {
const { user, logout } = useAuth();
const navigate = useNavigate();

const menuItems = [
{
label: "Dashboard",
path: "/dashboard",
icon: LayoutDashboard,
},
{
label: "AI Interview",
path: "/interview",
icon: Mic,
},
{
label: "Interview History",
path: "/history",
icon: History,
},
{
label: "My Profile",
path: "/profile",
icon: UserRound,
},
];

const handleLogout = () => {
logout();
};

return (
<>
{isOpen && (
<button
type="button"
className="sidebar-overlay"
aria-label="Close sidebar"
onClick={onClose}
/>
)}

  <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
    <div className="sidebar-header">
      <div className="brand">
        <span className="brand-icon">
          <BrainCircuit size={23} />
        </span>

        <span>
          Interview<span className="brand-highlight">AI</span>
        </span>
      </div>

      {onClose && (
        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      )}
    </div>

    <div className="sidebar-section-label">
      MAIN MENU
    </div>

    <nav className="sidebar-menu">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>

    <div className="sidebar-bottom">
      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="sidebar-user-info">
          <strong>{user?.name || "Interview User"}</strong>
          <span>{user?.email || "Welcome back!"}</span>
        </div>
      </div>

      <button
        type="button"
        className="sidebar-link sidebar-logout"
        onClick={handleLogout}
      >
        <LogOut size={19} />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</>

);
}

export default Sidebar;