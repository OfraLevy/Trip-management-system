import axios from "axios";

const API_URL = "http://localhost:8080/api/classes";

export const listClasses = () =>  axios.get(API_URL);
 