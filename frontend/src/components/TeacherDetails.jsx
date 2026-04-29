
function TeacherDetails({ teacher, goBack }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h4 className="mb-0">פרטי מורה</h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={goBack}>
          חזרה ←
        </button>
      </div>
    
      <div className="card-body">
        <h2 className="card-title mb-4">{teacher.fullName}</h2>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <strong>תז</strong>
            <span>{teacher.id}</span>
          </li>

          <li className="list-group-item d-flex justify-content-between">
            <strong>כיתה</strong>
            <span>{teacher.classRoom?.name}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TeacherDetails;