// mobile/src/api.js
import axios from 'axios';

// ⚠️ CAMBIO AQUÍ: De 8081 a 3000
// Si tu backend dice "Server running on port 3000", pon 3000.
const API_URL = 'http://192.168.1.173:3000/api'; 

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export default api;