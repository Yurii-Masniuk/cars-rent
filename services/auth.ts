import { LoginBody, LoginResponse, LogoutResponse, RefreshResponse, RegisterBody, RegisterResponse, User } from "@/types/auth";
import { proxyServer } from "./server-config";

export const register = async (body: RegisterBody) => {
    const res = await proxyServer.post<RegisterResponse>('/auth/register', body);
    return res.data;
};

export const login = async (body: LoginBody) => {
    const res = await proxyServer.post<LoginResponse>('/auth/login', body);
    return res.data;
};

export const refresh = async () => {
    const res = await proxyServer.post<RefreshResponse>('/auth/refresh', null);
    return res.data;
};

export const logout = async () => {
    const res = await proxyServer.post<LogoutResponse>('/auth/logout', null);
    return res.data;
};

export const getMe = async () => {
    const res = await proxyServer.get<User>('/auth/me');
    return res.data;
};