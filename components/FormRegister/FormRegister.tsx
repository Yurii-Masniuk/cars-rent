'use client';

import { register } from '@/services/auth';
import css from './FormRegister.module.css';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import React, { useState } from 'react';

const FormRegister = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrMessage(null);
        setIsLoading(true);
        const { name, email, password } = formData;

        const body = {
            name,
            email,
            password,
        };

        try {
            await register(body);
            router.push('/login');
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 409) {
                setErrMessage("Такий email вже зареєстрований");
            } else {
                const message = err.response?.data?.message || err.message || 'ERROR';
                setErrMessage(message);
            };
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className={css['formRegister']}>
            <form onSubmit={handleSubmit}>
                <h3>Реєстрація</h3>
                <div>
                    <label>Ім&#39;я</label>
                    <input
                        name='name'
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Введіть своє ім'я"
                        required />
                </div>
                <div>
                    <label>Електронна пошта</label>
                    <input
                        name='email'
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введіть адресу електронної пошти"
                        required />

                </div>
                <div>
                    <label >Пароль</label>
                    <input
                        name='password'
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введіть пароль"
                        required />
                </div>
                
                {errMessage && <p className={css.error}>{errMessage}</p>}
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Завантаження' : 'Реєстрація'}
                </button>
            </form>
        </div>
    );
};

export default FormRegister;