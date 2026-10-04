
export type transmission = 'automatic' | 'manual';
export type fuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type category = 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury';
export type status = 'active' | 'maintenance' | 'inactive';

export interface Car {
    _id: string;
    locationId: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    transmission: transmission;
    fuelType: fuelType;
    category: category;
    seats: number;
    pricePerDay: number;
    mileage: number;
    images: string[];
    status: status;
    createdAt: string;
    updatedAt: string;
};

export interface GetCarsResponse {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    cars: Car[];
};

export interface CreateCarBody {
    locationId: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    transmission: transmission;
    fuelType: fuelType;
    category: category;
    seats: number;
    pricePerDay: number;
    mileage?: number;
    images?: string[];
    status?: status;
};

export interface UpdateCarBody {
    locationId?: string;
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
    transmission?: transmission;
    fuelType?: fuelType;
    category?: category;
    seats?: number;
    pricePerDay?: number;
    mileage?: number;
    images?: string[];
    status?: status;
};