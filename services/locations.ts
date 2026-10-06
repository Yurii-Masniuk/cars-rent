import { CreateLocationBody, GetLocationsParams, GetLocationsResponse, Location, UpdateLocationBody } from "@/types/locations";
import { proxyServer } from "./server-config";

export const getLocations = async (params: GetLocationsParams) => {
    const res = await proxyServer.get<GetLocationsResponse>('/locations', {params});
    return res.data;
 };

export const createLocation = async (body: CreateLocationBody) => { 
    const res = await proxyServer.post<Location>('/locations', body);
    return res.data;
};

export const getLocationById = async (id: string) => {
    const res = await proxyServer.get<Location>(`/locations/${id}`);
    return res.data;
};

export const updateLocation = async (id: string, body: UpdateLocationBody) => {
    const res = await proxyServer.patch<Location>(`/locations/${id}`, body);
    return res.data;
};

export const deleteLocation = async (id: string) => {
    const res = await proxyServer.delete<Location>(`/locations/${id}`);
    return res.data;
};