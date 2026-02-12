// mobile/src/api.js
import axios from 'axios';

const API_URL = 'http://192.168.1.173:3000/api'; 

const api = axios.create({
    baseURL: API_URL,
});

export default api;