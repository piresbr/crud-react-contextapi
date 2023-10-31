import axios from "axios";

const api = axios.create({
    baseURL: "https://6526989a917d673fd76c9b76.mockapi.io/api/v1",
});

export { api };
