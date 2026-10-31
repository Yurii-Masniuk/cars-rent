'use client';

import { GetLocationsResponse, Location as LocationType } from '@/types/locations';

import { CreateCarBody } from '@/types/cars';
import css from './CarFormCreateAdmin.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createCar } from '@/services/cars';
import { AxiosError } from 'axios';
import { getLocations } from '@/services/locations';


const CarFormCreateAdmin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: locationsData } = useQuery({
        queryKey: ['locations-dropdown'],
        queryFn: () => getLocations(1),
    });

    const rawData = locationsData as GetLocationsResponse | undefined;
    const locationsList: LocationType[] = rawData?.locations || [];

    const [formData, setFormData] = useState<CreateCarBody>({
        locationId: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        transmission: 'automatic',
        fuelType: 'petrol',
        category: 'sedan',
        seats: 5,
        pricePerDay: 0,
        mileage: 0,
        images: [],
        status: 'active',
    });

    const mutation = useMutation({
        mutationFn: (body: CreateCarBody) => createCar(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            router.push(`/admin/cars/`);
            router.refresh();
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const getErrorMessage = () => {
        if (!mutation.error) return null;
        const err = mutation.error as AxiosError<{ message: string }>;
        return err.response?.data?.message || err.message || "Помилка при створенні даних автомобіля";
    };
        
    const errMessage = getErrorMessage();
    const isLoading = mutation.isPending;

    
    return (
        <div className={css.formCreateUser}>
            <form onSubmit={handleSubmit}>
                <h3>Створити новий автомобіль</h3>
                
                <div>
                    <label>Локація</label>
                    <select
                        name='locationId'
                        value={formData.locationId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Оберіть локацію</option>
                        {locationsList.map((el) => (
                            <option key={el._id} value={el._id}>
                                {el.city} — {el.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Бренд</label>
                    <input
                        name='brand'
                        type="text"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Модель</label>
                    <input
                        name='model'
                        type="text"
                        value={formData.model}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Рік</label>
                    <input
                        name='year'
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Колір</label>
                    <input
                        name='color'
                        type="text"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Коробка передач</label>
                    <select
                        name='transmission'
                        value={formData.transmission}
                        onChange={handleChange}
                    >
                        <option value="automatic">Автомат</option>
                        <option value="manual">Механіка</option>
                    </select>
                </div>

                <div>
                    <label>Тип пального</label>
                    <select
                        name='fuelType'
                        value={formData.fuelType}
                        onChange={handleChange}
                    >
                        <option value="petrol">Бензин</option>
                        <option value="diesel">Дизель</option>
                        <option value="hybrid">Гібрид</option>
                        <option value="electric">Електро</option>
                    </select>
                </div>

                <div>
                    <label>Категорія</label>
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="economy">Економ</option>
                        <option value="compact">Компакт</option>
                        <option value="sedan">Седан</option>
                        <option value="suv">Позашляховик</option>
                        <option value="luxury">Люкс</option>
                    </select>
                </div>

                <div>
                    <label>Кількість місць</label>
                    <input
                        name='seats'
                        type="number"
                        value={formData.seats}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Ціна за день ($)</label>
                    <input
                        name='pricePerDay'
                        type="number"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Пробіг (км)</label>
                    <input
                        name='mileage'
                        type="number"
                        value={formData.mileage}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Статус</label>
                    <select
                        name='status'
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="active">Активний</option>
                        <option value="maintenance">На обслуговуванні</option>
                        <option value="inactive">Неактивний</option>
                    </select>
                </div>

                {errMessage && <p className={css.error}>{errMessage}</p>}
              
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Створення...' : 'Створити автомобіль'}
                </button>
            </form>
        </div>
    );
    
};

export default CarFormCreateAdmin;