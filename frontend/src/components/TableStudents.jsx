function TableStudents({ data, showClass = false, onStudentClick }) {
  return (
    <table className="table table-striped table-hover table-bordered rounded-table">
      <thead className="table-head-custom">
        <tr>
          <th>שם</th>
          <th>תז</th>
          {showClass && <th>כיתה</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((student) => (
          <tr
            key={student.id}
            style={{ cursor: "pointer" }}
            onClick={() => onStudentClick(student)}
          >
            <td>{student.fullName}</td>
            <td>{student.id}</td>
            {showClass && <td>{student.className}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableStudents;