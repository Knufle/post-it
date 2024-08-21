import axios from 'axios';

const environment = process.env.NODE_ENV || 'development';

const api = axios.create({
    baseURL: environment === 'production' ? 'https://knufle-sticky-notes-api.herokuapp.com' : 'http://localhost:3333'
})

export default api;