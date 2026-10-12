import axios from "axios";

export const proxyServer = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export const globalServer = axios.create(
    {baseURL: "https://13v8rjkfud.execute-api.eu-central-1.amazonaws.com",}
);