'use client';

import css from './LocationFormCreate.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateLocationBody } from '@/types/locations';
import { createLocation } from '@/services/locations';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const LocationFormCreate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateLocationBody>({
    name: '',
    city: '',
    address: '',
    phone: '',
    openingTime: '',
    closingTime: '',
    isActive: true,
  });

  const mutation = useMutation({
    mutationFn: (body: CreateLocationBody) => createLocation(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      router.push(`/admin/locations/`);
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
    return err.response?.data?.message || err.message || "Помилка при створенні даних локації";
  };
          
  const errMessage = getErrorMessage();
  const isLoading = mutation.isPending;

  return (
    <div className={css.formCreateLocation}>
      <form onSubmit={handleSubmit}>
        <h3>Створити нову локацію</h3>
                
        <div>
          <label>Назва</label>
          <input
            name='name'
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Місто</label>
          <input
            name='city'
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Адреса</label>
          <input
            name='address'
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Телефон</label>
          <input
            name='phone'
            type="text"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Час відкриття</label>
          <input
            name='openingTime'
            type="text"
            value={formData.openingTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Час закриття</label>
          <input
            name='closingTime'
            type="text"
            value={formData.closingTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Статус</label>
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
          {isLoading ? 'Створення...' : 'Створити локацію'}
        </button>
      </form>
    </div>
  );
};

export default LocationFormCreate;