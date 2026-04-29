import { useState, useEffect } from "react";
import { addStudent } from "../services/StudentService";
import { listClasses } from "../services/ClassRoomService";

function AddStudentForm({ onStudentAdded }) {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [classID, setClassID] = useState();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    listClasses().then((response) => setClasses(response.data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const student = {
      id: Number(id),
      fullName: fullName.trim(),
    };

    setLoading(true);

    addStudent(student, classID)
      .then(() => {
        alert("התלמיד נוספה בהצלחה");
        setId("");
        setFullName("");
        setClassID("");
        onStudentAdded();
      })
      .catch(() => {
        alert("הוספת התלמיד נכשלה");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">הוספת תלמיד לכיתה</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="תעודת זהות"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="שם מלא"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={classID}
          onChange={(e) => setClassID(e.target.value)}
        >
          <option value="">בחרי כיתה</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "מוסיף..." : "הוספת תלמיד"}
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;
