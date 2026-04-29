import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TeacherApp from "./TeacherApp";
import StudentApp from "./StudentApp";
import { getTeacherById } from "./services/TeacherService";
import { getStudentById } from "./services/StudentService";
import AdminApp from "./AdminApp";
function App() {
  const [authPage, setAuthPage] = useState("login");

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return sessionStorage.getItem("currentRole");
  });


  function handleLogin(user) {
    if (user.role === "TEACHER") {
      getTeacherById(user.id).then((response) => {
        sessionStorage.setItem("currentUser", JSON.stringify(response.data));
        sessionStorage.setItem("currentRole", "TEACHER");
        setCurrentUser(response.data);
        setCurrentRole("TEACHER");
      });
    } else if (user.role === "STUDENT") {
      getStudentById(user.id).then((response) => {
        sessionStorage.setItem("currentUser", JSON.stringify(response.data));
        sessionStorage.setItem("currentRole", "STUDENT");
        setCurrentUser(response.data);
        setCurrentRole("STUDENT");
      });
    } else if (user.role === "ADMIN") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      sessionStorage.setItem("currentRole", "ADMIN");
      setCurrentUser(user);
      setCurrentRole("ADMIN");

    }
  }

  function logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentRole");
    setCurrentUser(null);
    setCurrentRole(null);
    setAuthPage("login");
  }

  if (!currentUser) {
    return (
      <div dir="rtl" className="container mt-5">
        {authPage === "login" ? (
          <Login
            onLogin={handleLogin}
            goToRegister={() => setAuthPage("register")}
          />
        ) : (
          <Register
            onLogin={handleLogin}
            goToLogin={() => setAuthPage("login")}
          />
        )}
      </div>
    );
  }

  if (currentRole === "TEACHER") {
    return <TeacherApp teacher={currentUser} logout={logout} />;
  }

  if (currentRole === "STUDENT") {
    return <StudentApp student={currentUser} logout={logout} />;
  }

  if (currentRole === "ADMIN") {
  return <AdminApp logout={logout} />;
}

  return <h1>סוג משתמש לא מזוהה</h1>;
}

export default App;
