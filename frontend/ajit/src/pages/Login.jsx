import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
BrainCircuit,
Mail,
Lock,
ArrowRight,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
const navigate = useNavigate();
const { login } = useAuth();

const [form, setForm] = useState({
email: "",
password: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");

try {
  setLoading(true);

  const response = await api.post(
    "/api/auth/login",
    form
  );

  const { token, user } = response.data;

  if (!token) {
    setError("Login response did not contain a token.");
    return;
  }
  login(token, user || null);

  navigate("/dashboard", { replace: true });
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Login failed. Check your credentials."
  );
} finally {
  setLoading(false);
}

};

return (
<main className="auth-page">
<Link to="/" className="brand auth-brand">
<span className="brand-icon">
<BrainCircuit size={24} />
</span>

    <span>
      Interview<span className="brand-highlight">AI</span>
    </span>
  </Link>

  <section className="auth-card">
    <div className="auth-heading">
      <span className="section-label">
        WELCOME BACK
      </span>

      <h1>Log in to InterviewAI</h1>

      <p>
        Your next interview is an opportunity to shine.
      </p>
    </div>

    {error && (
      <div className="auth-error">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email address
      </label>

      <div className="input-wrap">
        <Mail size={18} />

        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </div>

      <label htmlFor="password">
        Password
      </label>

      <div className="input-wrap">
        <Lock size={18} />

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
      </div>

      <button
        type="submit"
        className="button auth-submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}

        {!loading && <ArrowRight size={18} />}
      </button>
    </form>

    <p className="auth-switch">
      Don't have an account?{" "}
      <Link to="/signup">Create one</Link>
    </p>
  </section>
</main>

);
}

export default Login;