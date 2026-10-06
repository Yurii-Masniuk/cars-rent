import { GetUsersParams, GetUsersResponse, UpdateUserBody, User } from "@/types/users";
import { proxyServer } from "./server-config";

export const getUsers = async (params: GetUsersParams) => {
    const res = await proxyServer.get<GetUsersResponse>('/users', {params});
    return res.data;
};
 
export const getUserById = async (id: string) => {
    const res = await proxyServer.get<User>(`/users/${id}`);
    return res.data;
};
 
export const updateUser = async (id: string, body: UpdateUserBody) => { 
    const res = await proxyServer.patch<User>(`/users/${id}`, body);
    return res.data;
};