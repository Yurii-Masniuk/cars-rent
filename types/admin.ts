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

export type transmission = 'automatic' | 'manual';
export type fuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type category = 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury';
export type status = 'active' | 'maintenance' | 'inactive';

export interface FleetStatusStat {
    status: status;
    count: number;
};

export interface FleetCategoryStat {
    category: category;
    count: number;
};

export interface FleetFuelStat {
    fuelType: fuelType;
    count: number;
};

export interface FleetTransmissionStat {
    transmission: transmission;
    count: number;
};

export interface GetDashboardFleetStats {
    byStatus: FleetStatusStat[];
    byCategory: FleetCategoryStat[];
    byFuelType: FleetFuelStat[];
    byTransmission: FleetTransmissionStat[];
};