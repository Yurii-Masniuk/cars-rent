import { GetDashboardFleetStats, GetDashboardRevenue, GetDashboardStatisticResponse } from "@/types/admin";
import { proxyServer } from "./server-config";

export const getDashboardStatistic = async () => {
    const res = await proxyServer.get<GetDashboardStatisticResponse>('/admin/dashboard');
    return res.data;
};
 
export const getRevenueByDays = async () => {
    const res = await proxyServer.get<GetDashboardRevenue>('/admin/dashboard/revenue');
    return res.data;
};

export const getFleetStatistic = async () => {
    const res = await proxyServer.get<GetDashboardFleetStats>('/admin/dashboard/fleet');
    return res.data;
};