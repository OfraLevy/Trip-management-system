import { useState } from "react";
import { login } from "../services/UserService";

function Login({ onLogin, goToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    login(username.trim(), password)
      .then((response) => {
        onLogin(response.data);
      })
      .catch(() => {
        alert("שם משתמש או סיסמה שגויים");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">התחברות</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-3" disabled={loading}>
          {loading ? "מתחבר..." : "התחברות"}
        </button>
      </form>

      <button className="btn btn-link" onClick={goToRegister}>
        אין לך משתמש? הרשמה
      </button>
    </div>
  );
}

export default Login;
