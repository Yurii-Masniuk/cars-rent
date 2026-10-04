import axios from "axios";

export const proxyServer = axios.create({
    baseURL: "https://13v8rjkfud.execute-api.eu-central-1.amazonaws.com",
    withCredentials: true,
});