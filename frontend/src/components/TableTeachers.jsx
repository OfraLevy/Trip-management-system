function TableTeachers({ data, onTeacherClick }) {
  return (
    <table className="table table-striped table-hover table-bordered rounded-table">
      <thead className="table-head-custom">
        <tr>
          <th>שם</th>
          <th>תז</th>
          <th>כיתה</th>
        </tr>
      </thead>

      <tbody>
        {data.map((teacher) => (
          <tr
            key={teacher.id}
            style={{ cursor: "pointer" }}
            onClick={() => onTeacherClick(teacher)}
          >
            <td>{teacher.fullName}</td>
            <td>{teacher.id}</td>
            <td>{teacher.classRoom.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableTeachers;