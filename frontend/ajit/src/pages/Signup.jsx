import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
BrainCircuit,
User,
Mail,
Lock,
ArrowRight,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Signup() {
const navigate = useNavigate();
const { login } = useAuth();

const [form, setForm] = useState({
name: "",
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

if (form.password.length < 6) {
  setError(
    "Password must contain at least 6 characters."
  );
  return;
}

try {
  setLoading(true);

  const response = await api.post(
    "/api/auth/register",
    form
  );

  const { token, user } = response.data;

  if (token) {
    login(token, user || {
      name: form.name,
      email: form.email,
    });

    navigate("/dashboard", { replace: true });
  } else {
    navigate("/login", { replace: true });
  }
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Registration failed. Please try again."
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
        START YOUR JOURNEY
      </span>

      <h1>Create your account</h1>

      <p>
        Build confidence before your next interview.
      </p>
    </div>

    {error && (
      <div className="auth-error">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Full name
      </label>

      <div className="input-wrap">
        <User size={18} />

        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </div>

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
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          minLength={6}
          required
        />
      </div>

      <button
        type="submit"
        className="button auth-submit"
        disabled={loading}
      >
        {loading
          ? "Creating account..."
          : "Create Account"}

        {!loading && <ArrowRight size={18} />}
      </button>
    </form>

    <p className="auth-switch">
      Already have an account?{" "}
      <Link to="/login">Log in</Link>
    </p>
  </section>
</main>

);
}

export default Signup;