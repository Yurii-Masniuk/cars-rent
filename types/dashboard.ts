export type Transmission = 'automatic' | 'manual';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type Category = 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury';
export type Status = 'active' | 'maintenance' | 'inactive';

export interface DashboardStats {
    totalCars: number;
    activeCars: number;
    totalUsers: number;
    activeBookings: number;
    monthRevenue: number;
    monthRentalDays: number;
};

export interface RevenueItem {
    date: string;
    revenue: number;
    bookingsCount: number;
};

export interface DashboardRevenue {
    periodStart: string;
    periodEnd: string;
    revenueByDay: RevenueItem[];
};

export interface StatusStat {
    status: Status;
    count: number;
};

export interface CategoryStat {
    category: Category;
    count: number;
};

export interface FuelTypeStat {
    fuelType: FuelType;
    count: number;
};

export interface TransmissionStat {
    transmission: Transmission;
    count: number;
};

export interface DashboardFleetStats {
    byStatus: StatusStat[];
    byCategory: CategoryStat[];
    byFuelType: FuelTypeStat[];
    byTransmission: TransmissionStat[];
};