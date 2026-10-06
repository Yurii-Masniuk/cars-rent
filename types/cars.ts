export type SortField = null | 'createdAt' | 'updatedAt' | 'brand' | 'model' | 'year' | 'pricePerDay' | 'mileage' | 'seats';
export type SortOrder = null | 'asc' | 'desc';
export type Transmission = 'automatic' | 'manual';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type Category = 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury';
export type Status = 'active' | 'maintenance' | 'inactive';

export interface Car {
    _id: string;
    locationId: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    transmission: Transmission;
    fuelType: FuelType;
    category: Category;
    seats: number;
    pricePerDay: number;
    mileage: number;
    images: string[];
    status: Status;
    createdAt: string;
    updatedAt: string;
};

export interface GetCarsParams {
    page?: number;
    perPage?: number;
    sortField?: SortField;
    sortOrder?: SortOrder;
    locationId?: string;
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
    transmission?: Transmission;
    fuelType?: FuelType;
    category?: Category;
    status?: Status;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
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
    transmission: Transmission;
    fuelType: FuelType;
    category: Category;
    seats: number;
    pricePerDay: number;
    mileage?: number;
    images?: string[];
    status?: Status;
};

export interface UpdateCarBody {
    locationId?: string;
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
    transmission?: Transmission;
    fuelType?: FuelType;
    category?: Category;
    seats?: number;
    pricePerDay?: number;
    mileage?: number;
    images?: string[];
    status?: Status;
};