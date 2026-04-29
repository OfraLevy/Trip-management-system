import { useState } from "react";
import { register } from "../services/UserService";

function Register({ onLogin, goToLogin }) {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [teacher, setTeacher] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleRegister(e) {
    e.preventDefault();
    if (hasHebrew(password)) {
      alert("סיסמה לא יכולה להכיל תווים בעברית");
      return;
    }

    if (password !== checkPassword) {
      alert("הסיסמאות לא תואמות");
      return;
    }
    setLoading(true);

    const newUser = {
      id: Number(id),
      userName: userName.trim(),
      teacher,
      password,
    };

    register(newUser)
      .then((response) => {
        onLogin(response.data);
      })
      .catch(() => {
        alert("הרישום נכשל. בדקי שהמשתמש קיים במערכת ושלא נרשמת כבר.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function hasHebrew(text) {
    return /[\u0590-\u05FF]/.test(text);
  }

  return (
    <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "450px" }}>
      <h3 className="text-center mb-4">הרשמה</h3>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="תעודת זהות"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="שם משתמש"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="אימות סיסמה"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value === "true")}
        >
          <option value="true">מורה</option>
          <option value="false">תלמיד</option>
        </select>

        <button className="btn btn-primary w-100 mb-3" disabled={loading}>
          {loading ? "נרשם..." : "הרשמה"}
        </button>
      </form>

      <button className="btn btn-link" onClick={goToLogin}>
        כבר יש לך משתמש? התחברות
      </button>
    </div>
  );
}

export default Register;
