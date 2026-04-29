import LocationsMap from "./components/LocationsMap";
import { getTeacherOfStudent } from "./services/StudentService";
import { useState, useEffect } from "react";

function StudentApp({ student, logout }) {
  const [teacherLocation, setTeacherLocation] = useState(null);

  useEffect(() => {
    getTeacherOfStudent(student.id)
      .then((response) => {
        setTeacherLocation(response.data.location);
      })
      .catch((error) => {
        console.error("Error fetching teacher location:", error);
      });
  }, [student.id]);

  return (
    <div dir="rtl" className="container mt-5 ">
      <button className="btn btn-outline-primary" onClick={logout}>
        התנתקות
      </button>
      <h1 className="text-center">שלום {student.fullName}</h1>

      <LocationsMap user={student} teacherLocation={teacherLocation} />
    </div>
  );
}

export default StudentApp;
