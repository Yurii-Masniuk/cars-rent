import { Car, CreateCarBody, GetCarsResponse, UpdateCarBody } from "@/types/cars";
import { proxyServer } from "./server-config";

export const getCars = async () => {
    const res = await proxyServer.get<GetCarsResponse>('/cars');
    return res.data;
};
 
export const createCar = async (body: CreateCarBody) => {
    const res = await proxyServer.post<Car>('/cars', body);
    return res.data;
};

export const getCarById = async (id: string) => {
    const res = await proxyServer.get<Car>(`/cars/${id}`);
    return res.data;
};

export const updateCarById = async (id: string, body: UpdateCarBody) => {
    const res = await proxyServer.patch<Car>(`/cars/${id}`, body);
    return res.data;
};

export const deleteCar = async (id: string) => {
    const res = await proxyServer.delete<Car>(`/cars/${id}`);
    return res.data;
};