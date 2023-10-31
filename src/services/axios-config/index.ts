import axios from "axios";

const API_URL = 'https://6526989a917d673fd76c9b76.mockapi.io/api/v1';

const api = axios.create({
    baseURL: API_URL,
})

export { api }