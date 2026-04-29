import { useState } from "react";
import { addTeacher } from "../services/TeacherService";

function AddTeacherForm({ onTeacherAdded }) {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const teacher = {
      id: Number(id),
      fullName: fullName.trim(),
      classRoom: {
        name: className.trim()
      }
    };

    setLoading(true);

    addTeacher(teacher)
      .then(() => {
        alert("המורה נוספה בהצלחה");
        setId("");
        setFullName("");
        setClassName("");
        onTeacherAdded();
      })
      .catch(() => {
        alert("הוספת המורה נכשלה");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">הוספת מורה</h3>

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

        <input
          className="form-control mb-3"
          placeholder="שם כיתה"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "מוסיף..." : "הוספת מורה"}
        </button>
      </form>
    </div>
  );
}

export default AddTeacherForm