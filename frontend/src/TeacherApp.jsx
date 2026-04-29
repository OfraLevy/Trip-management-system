import { useState, useEffect } from "react";
import { listStudents } from "./services/StudentService";
import { listTeachers } from "./services/TeacherService";
import TableStudents from "./components/TableStudents";
import TableTeachers from "./components/TableTeachers";
import StudentDetails from "./components/StudentDetails";
import TeacherDetails from "./components/TeacherDetails";
import LocationsMap from "./components/LocationsMap";
import "./App.css";

function TeacherApp({ teacher, logout }) {
  const [page, setPage] = useState("home");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  useEffect(() => {
    listTeachers()
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  return (
    <div dir="rtl" className="container mt-4">
      {/* navbar */}
      <div className="custom-header mb-5 p-3">
        <button className="btn btn-outline-primary" onClick={logout}>
          התנתקות
        </button>

        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${page === "home" ? "active" : ""}`}
              onClick={() => {
                setSelectedStudent(null);
                setSelectedTeacher(null);
                setPage("home");
              }}
            >
              עמוד הבית
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${page === "teachers" ? "active" : ""}`}
              onClick={() => {
                setSelectedStudent(null);
                setSelectedTeacher(null);
                setPage("teachers");
              }}
            >
              רשימת המורים
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${page === "students" ? "active" : ""}`}
              onClick={() => {
                setSelectedStudent(null);
                setSelectedTeacher(null);
                setPage("students");
              }}
            >
              רשימת התלמידים
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${page === "map" ? "active" : ""}`}
              onClick={() => {
                setSelectedStudent(null);
                setSelectedTeacher(null);
                setPage("map");
              }}
            >
              מפת התלמידים
            </button>
          </li>
        </ul>
      </div>

      {/* pages */}
      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          goBack={() => setSelectedStudent(null)}
        />
      )}

      {selectedTeacher && (
        <TeacherDetails
          teacher={selectedTeacher}
          goBack={() => setSelectedTeacher(null)}
        />
      )}

      {!selectedStudent && !selectedTeacher && page === "home" && (
        <>
          <h1 className="mb-5 text-end">היי המורה {teacher.fullName}</h1>

          <h4 className="text-center mb-4">
            התלמידים שלך ({teacher.classRoom.name})
          </h4>

          <TableStudents
            data={teacher.classRoom.students}
            onStudentClick={setSelectedStudent}
          />
        </>
      )}

      {!selectedStudent && !selectedTeacher && page === "students" && (
        <>
          <h2 className="mb-4 text-center">רשימת תלמידים</h2>
          <TableStudents
            data={students}
            showClass={true}
            onStudentClick={setSelectedStudent}
          />
        </>
      )}

      {!selectedStudent && !selectedTeacher && page === "teachers" && (
        <>
          <h2 className="mb-4 text-center">רשימת מורים</h2>
          <TableTeachers data={teachers} onTeacherClick={setSelectedTeacher} />
        </>
      )}
      {!selectedStudent && !selectedTeacher && page === "map" && (
        <>
          <h1 className="mb-5 text-end">מפת התלמידים</h1>

          <LocationsMap user={teacher} teacherLocation={teacher.location} />
        </>
      )}
    </div>
  );
}

export default TeacherApp;
