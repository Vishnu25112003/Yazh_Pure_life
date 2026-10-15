import { useState, type FormEvent } from "react";
import { useAuth } from "../auth";
import { errMsg, Field } from "../ui";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(errMsg(err));
      setBusy(false);
    }
  };

  return (
    <div className="adm-login">
      <form className="adm-card" onSubmit={submit} noValidate>
        <img src="/assets/logo.png" alt="Yazh Pure Life" />
        <h1>Admin sign in</h1>
        {error && (
          <div className="adm-alert" role="alert">
            {error}
          </div>
        )}
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            className="adm-input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <input
            id="password"
            className="adm-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <button className="adm-btn adm-btn-primary" style={{ width: "100%" }} disabled={busy || !email || !password}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
