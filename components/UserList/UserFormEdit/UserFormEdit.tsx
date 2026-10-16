'use client';

import { UpdateUserBody, User } from '@/types/users';
import css from './UserFormEdit.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/users';
import { AxiosError } from 'axios';

interface UserFormEditProps{
    user: User,
};

const UserFormEdit = ({ user }: UserFormEditProps) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<UpdateUserBody>({
        name: user.name,
        phone: user.phone,
        role: user.role,
        isBlocked: user.isBlocked,
    });

    const mutation = useMutation({
        mutationFn: (body: UpdateUserBody) => updateUser(user._id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            router.push('/admin/users');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const getErrorMessage = () => {
        if (!mutation.error) return null;
        const err = mutation.error as AxiosError<{ message: string }>;
        return err.response?.data?.message || err.message || "Помилка при оновленні даних користувача";
    }; 

    const errMessage = getErrorMessage();
    const isLoading = mutation.isPending;
        
    return (
        <div className={css.formEditUser}>
            <form onSubmit={handleSubmit}>
                <h3>Редагування</h3>
                <div>
                    <label>Ім&#39;я</label>
                    <input
                        name='name'
                        type="text"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Телефон:</label>
                    <input
                        name='phone'
                        type="text"
                        value={formData.phone || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Статус</label>
                    <input
                        name='role'
                        type="text"
                        value={formData.role || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={css.accessField}>
                    <label>Доступ:</label>
                    <span className={formData.isBlocked ? css.statusBlocked : css.statusActive}>
                        {formData.isBlocked ? 'Заблоковано' : 'Дозволено'}
                    </span>
                </div>

                <div>
                    <label className={css.checkboxLabel}>
                        <input
                            name='isBlocked'
                            type="checkbox"
                            checked={formData.isBlocked || false}
                            onChange={handleChange}
                            className={css.checkboxInput}
                        />
                        Заблокувати користувача
                    </label>
                </div>


                {errMessage && <p className={css.error}>{errMessage}</p>}
              
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                </button>
            </form>
        </div>
    );
};

export default UserFormEdit;