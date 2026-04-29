
import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/users";

export function login(username, password) {
  return axios.post(`${API_BASE_URL}/login?username=${username}&password=${password}`);
}

export function register(user) {
  return axios.post(`${API_BASE_URL}/register`, user);
}
