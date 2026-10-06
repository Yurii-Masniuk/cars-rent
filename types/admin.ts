export interface GetDashboardStatisticResponse {
    totalCars: number;
    activeCars: number;
    totalUsers: number;
    activeBookings: number;
    monthRevenue: number;
    monthRentalDays: number;
};

export interface RevenueDay {
    date: string;
    revenue: number;
    bookingsCount: number;
};

export interface GetDashboardRevenue {
    periodStart: string;
    periodEnd: string;
    revenueByDay: RevenueDay[];
};

export type Transmission = 'automatic' | 'manual';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type Category = 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury';
export type Status = 'active' | 'maintenance' | 'inactive';

export interface FleetStatusStat {
    status: Status;
    count: number;
};

export interface FleetCategoryStat {
    category: Category;
    count: number;
};

export interface FleetFuelStat {
    fuelType: FuelType;
    count: number;
};

export interface FleetTransmissionStat {
    transmission: Transmission;
    count: number;
};

export interface GetDashboardFleetStats {
    byStatus: FleetStatusStat[];
    byCategory: FleetCategoryStat[];
    byFuelType: FleetFuelStat[];
    byTransmission: FleetTransmissionStat[];
};