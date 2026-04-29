import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

export const listStudents = () =>  axios.get(API_URL);
  
export const getStudentById = (id) => axios.get(`${API_URL}/${id}`);

export const addStudent = (studentData,choosenClass) => axios.post(`${API_URL}/${choosenClass}`, studentData);

export const studentsWithLocation = () => axios.get(`${API_URL}/listWithLocation`);

export const getTeacherOfStudent = (studentId) => axios.get(`${API_URL}/teacherOfStudent/${studentId}`);