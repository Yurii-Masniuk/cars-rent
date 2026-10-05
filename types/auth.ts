export type role = 'user' | 'admin';

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: role;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
};

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
};

export interface RegisterResponse {
    message: string;
};

export interface LoginBody {
    email: string;
    password: string;
};

export interface LoginResponse {
    accessToken: string;
};

export interface RefreshResponse {
    accessToken: string;
};

export interface LogoutResponse {
    message: string;
};

export interface CurrentBodyResponse {
    user: User;
};