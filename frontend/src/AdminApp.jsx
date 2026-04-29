import { useState, useEffect } from "react";
import { listStudents } from "./services/StudentService";
import { listTeachers } from "./services/TeacherService";
import TableStudents from "./components/TableStudents";
import TableTeachers from "./components/TableTeachers";
import AddTeacherForm from "./components/AddTeacherForm";
import AddStudentForm from "./components/AddStudentForm";


function AdminApp({ logout }) {
  const [page, setPage] = useState("teachers");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    listStudents().then((response) => setStudents(response.data));
    listTeachers().then((response) => setTeachers(response.data));
  }, []);

  function refreshTeachers() {
    listTeachers().then((response) => setTeachers(response.data));
  }

    function refreshStudents() {
    listStudents().then((response) => setStudents(response.data));
  }
  return (
    <div dir="rtl" className="container mt-4">
      <button className="btn btn-outline-primary" onClick={logout}>
        התנתקות
      </button>
      <div className="custom-header mb-5 p-3">
        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${page === "teachers" ? "active" : ""}`}
              onClick={() => setPage("teachers")}
            >
              רשימת מורים
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${page === "students" ? "active" : ""}`}
              onClick={() => setPage("students")}
            >
              רשימת תלמידים
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${page === "addTeacher" ? "active" : ""}`}
              onClick={() => setPage("addTeacher")}
            >
              הוספת מורה
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${page === "addStudent" ? "active" : ""}`}
              onClick={() => setPage("addStudent")}
            >
              הוספת תלמיד
            </button>
          </li>
        </ul>
      </div>

      {page === "teachers" && (
        <>
          <h2 className="text-center mb-4">רשימת מורים</h2>
          <TableTeachers data={teachers} />
        </>
      )}

      {page === "students" && (
        <>
          <h2 className="text-center mb-4">רשימת תלמידים</h2>
          <TableStudents data={students} showClass={true} />
        </>
      )}

      {page === "addTeacher" && (
        <AddTeacherForm onTeacherAdded={refreshTeachers} />
      )}

      {page === "addStudent" && <AddStudentForm onStudentAdded={refreshStudents} />}
    </div>
  );
}


export default AdminApp;
