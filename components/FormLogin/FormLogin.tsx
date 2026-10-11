'use client';

import { getMe, login } from '@/services/auth';
import css from './FormLogin.module.css';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useState } from 'react';

const FormLogin = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    const [formData, setFormData] = useState({
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

        const { email, password } = formData;

        const body = {
            email,
            password,
        };

        try {
            await login(body);
            const res = await getMe();
            setUser(res);
            router.push('/');
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const status = err.response?.status;

            switch (status) {
                case 400:
                    setErrMessage("Перевірте коректність заповнених полів.");
                    break;
                case 401:
                    setErrMessage("Невірний email або пароль.");
                    break;
                case 404:
                    setErrMessage("Користувача з такою адресою не знайдено.");
                    break;
                default:
                    if (status && status >= 500) {
                        setErrMessage("Помилка на сервері. Спробуйте пізніше.");
                    } else {
                        setErrMessage(err.response?.data?.message || err.message || "Щось пішло не так...");
                    }
                    break;
            }
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className={css['formLogin']}>
            <form onSubmit={handleSubmit}>
                <h3>Вхід до системи</h3>
                <div>
                    <label>Електронна пошта</label>
                    <input
                        name='email'
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введіть адресу електронної пошти"
                        required
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        name='password'
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введіть пароль"
                        required
                    />
                </div>
                {errMessage && <p className={css.error}>{errMessage}</p>}
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Завантаження...' : 'Увійти'}
                </button>
            </form>
        </div>
    );
};

export default FormLogin;