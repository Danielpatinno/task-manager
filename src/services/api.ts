import axios from 'axios';

export const api = axios.create({
    baseURL: "https://task-api-jet.vercel.app",
    headers: {
        'Content-Type': 'application/json',
    }
})
