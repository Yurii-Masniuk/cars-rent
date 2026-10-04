export interface Location {
    _id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    openingTime: string;
    closingTime: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export interface GetLocationsResponse {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    locations: Location[];
};

export interface CreateLocationBody {
    name: string;
    city: string;
    address: string;
    phone: string;
    openingTime: string;
    closingTime: string;
    isActive: boolean;
};

export interface UpdateLocationBody {
    name?: string;
    city?: string;
    address?: string;
    phone?: string;
    openingTime?: string;
    closingTime?: string;
    isActive?: boolean;
};