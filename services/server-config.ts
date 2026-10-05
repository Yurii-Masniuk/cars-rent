import axios from "axios";

export const proxyServer = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const globalServer = axios.create(
    {baseURL: "https://q10gsl5s9d.execute-api.us-east-1.amazonaws.com",}
);