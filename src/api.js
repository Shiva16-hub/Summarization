import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',  // FastAPI backend URL
});

export default instance;
