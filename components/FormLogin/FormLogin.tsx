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
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setErrMessage(null);

        const body = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            await login(body);
            const res = await getMe();
            setUser(res);
            router.push('/');
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const message = err.response?.data?.message || err.message || 'ERROR';
            setErrMessage(message);
        };
    };

    return (
        <div className={css['formLogin']}>
            <form action={handleSubmit}>
                <input name='email' type="email" placeholder='Enter your email' />
                <input name='password' type="password" placeholder='Enter your password' />
                {errMessage && <p>{errMessage}</p>}
                <button type='submit'>Sign in</button>
            </form>
        </div>
    );
};

export default FormLogin;