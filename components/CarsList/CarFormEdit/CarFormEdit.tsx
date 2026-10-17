'use client';

import { Car, UpdateCarBody } from '@/types/cars';
import css from './CarFormEdit.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateCarById } from '@/services/cars';
import { AxiosError } from 'axios';

interface CarFormEditProps{
    car: Car,
};

const CarFormEdit = ({ car }: CarFormEditProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<UpdateCarBody>({
        locationId: car.locationId,
        brand: car.brand,
        model: car.model,
        year: car.year,
        color: car.color,
        transmission: car.transmission,
        fuelType: car.fuelType,
        category: car.category,
        seats: car.seats,
        pricePerDay: car.pricePerDay,
        mileage: car.mileage,
        images: car.images,
        status: car.status,
    });
    
    const mutation = useMutation({
        mutationFn: (body: UpdateCarBody) => updateCarById(car._id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            router.push(`/cars/${car._id}`);
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
        return err.response?.data?.message || err.message || "Помилка при оновленні даних автомобіля";
    };
    
    const errMessage = getErrorMessage();
    const isLoading = mutation.isPending;


    return (
        <div className={css.formEditUser}>
            <form onSubmit={handleSubmit}>
                <h3>Редагування</h3>
                <div>
                    <label>Бренд</label>
                    <input
                        name='brand'
                        type="text"
                        value={formData.brand || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Модель</label>
                    <input
                        name='model'
                        type="text"
                        value={formData.model || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Рік</label>
                    <input
                        name='year'
                        type="number"
                        value={formData.year || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Колір</label>
                    <input
                        name='color'
                        type="text"
                        value={formData.model || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Коробка передач</label>
                    <select
                        name='transmission'
                        value={formData.transmission || 'automatic'}
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
                        value={formData.fuelType || 'petrol'}
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
                        value={formData.category || 'sedan'}
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
                        value={formData.seats || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ціна за день ($)</label>
                    <input
                        name='pricePerDay'
                        type="number"
                        value={formData.pricePerDay || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Пробіг (км)</label>
                    <input
                        name='mileage'
                        type="number"
                        value={formData.mileage || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={css.accessField}>
                    <label>Поточний статус авто:</label>
                    <span className={
                        formData.status === 'active'
                            ? css.statusActive
                            : formData.status === 'maintenance'
                                ? css.statusMaintenance
                                : css.statusInactive
                    }>
                        {formData.status === 'active' && 'Активний'}
                        {formData.status === 'maintenance' && 'На обслуговуванні'}
                        {formData.status === 'inactive' && 'Неактивний'}
                    </span>
                </div>

                <div>
                    <label>Змінити статус</label>
                    <select
                        name='status'
                        value={formData.status || 'active'}
                        onChange={handleChange}
                    >
                        <option value="active">Активний</option>
                        <option value="maintenance">На обслуговуванні</option>
                        <option value="inactive">Неактивний</option>
                    </select>
                </div>

                {errMessage && <p className={css.error}>{errMessage}</p>}
              
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                </button>
            </form>
        </div>
    );
};

export default CarFormEdit;