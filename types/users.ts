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

export interface GetUsersParams {
    page: number;
    perPage: number;
    search: string;
    email: string;
    role: role;
    isBlocked: boolean;
};

export interface GetUsersResponse {
    users: User[];
 };

export interface UpdateUserBody { 
    name?: string;
    phone?: string;
    role?: role;
    isBlocked?: boolean;
};
