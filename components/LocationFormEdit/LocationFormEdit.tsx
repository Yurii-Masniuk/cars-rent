'use client';

import { Location, UpdateLocationBody } from '@/types/locations';
import css from './LocationFormEdit.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateLocation } from '@/services/locations';
import { AxiosError } from 'axios';

interface LocationFormEditProps{
    location: Location,
};

const LocationFormEdit = ({ location }: LocationFormEditProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<UpdateLocationBody>({
        name: location.name,
        city: location.city,
        address: location.address,
        phone: location.phone,
        openingTime: location.openingTime,
        closingTime: location.closingTime,
        isActive: location.isActive,
    });

    const mutation = useMutation({
        mutationFn: (body: UpdateLocationBody) => updateLocation(location._id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            router.push(`/admin/locations/${location._id}`);
            router.refresh();
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number | boolean = value;

        if (type === 'number') {
            parsedValue = Number(value);
        } else if (name === 'isActive') {
            parsedValue = value === 'true';
        }

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const getErrorMessage = () => {
        if (!mutation.error) return null;
        const err = mutation.error as AxiosError<{ message: string }>;
        return err.response?.data?.message || err.message || "Помилка при оновленні даних локації";
    };
        
    const errMessage = getErrorMessage();
    const isLoading = mutation.isPending;

    return (
        <div className={css.formEditLocation}>
            <form onSubmit={handleSubmit}>
                <h3>Редагування</h3>
                <div>
                    <label>Назва</label>
                    <input
                        name='name'
                        type="text"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Місто</label>
                    <input
                        name='city'
                        type="text"
                        value={formData.city || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Адреса</label>
                    <input
                        name='address'
                        type="text"
                        value={formData.address || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Телефон</label>
                    <input
                        name='phone'
                        type="text"
                        value={formData.phone || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Час відкриття</label>
                    <input
                        name='openingTime'
                        type="text"
                        value={formData.openingTime || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Час закриття</label>
                    <input
                        name='closingTime'
                        type="text"
                        value={formData.closingTime || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={css.accessField}>
                    <label>Поточний статус локації:</label>
                    <span className={formData.isActive ? css.statusActive : css.statusInactive}>
                        {formData.isActive ? 'Активна' : 'Неактивна'}
                    </span>
                </div>
                <div>
                    <label>Змінити статус</label>
                    <select
                        name='isActive'
                        value={String(formData.isActive)}
                        onChange={handleChange}
                    >
                        <option value="true">Активна</option>
                        <option value="false">Неактивна</option>
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

export default LocationFormEdit;