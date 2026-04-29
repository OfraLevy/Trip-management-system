import axios from "axios";

const API_URL = "http://localhost:8080/api/teachers";

export const listTeachers = () =>  axios.get(API_URL);
  
export const getTeacherById = (id) => axios.get(`${API_URL}/${id}`);

export const addTeacher = (teacherData) => axios.post(API_URL, teacherData);

export const teachersWithLocation = () => axios.get(`${API_URL}/listWithLocation`);