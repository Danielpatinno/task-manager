import axios from 'axios';

export const api = axios.create({
    baseURL: "https://api-adm.vercel.app/",
    headers: {
        'Content-Type': 'application/json',
    }
})
