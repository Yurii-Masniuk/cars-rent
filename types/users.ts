export type Role = 'user' | 'admin';

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
};

export interface GetUsersParams {
    page?: number;
    perPage?: number;
    search?: string;
    email?: string;
    role?: Role;
    isBlocked?: boolean;
};

export interface GetUsersResponse {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    users: User[];
};

export interface UpdateUserBody { 
    name?: string;
    phone?: string;
    role?: Role;
    isBlocked?: boolean;
};
