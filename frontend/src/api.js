import axios from 'axios';

// ¡AQUÍ TIENE QUE ESTAR LA IP DE AWS, NO LOCALHOST!
const API_URL = 'http://98.95.205.77:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;