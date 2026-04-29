import axios from "axios";
const API_URL = "http://localhost:8080/api/sensors";

export const setSensorLocation = (data) =>  axios.post(API_URL, data);