'use client';

import { register } from '@/services/auth';
import css from './FormRegister.module.css';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useState } from 'react';

const FormRegister = () => {
    const router = useRouter();
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setErrMessage(null);

        const body = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            await register(body);
            router.push('/login');
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const message = err.response?.data?.message || err.message || 'ERROR';
            setErrMessage(message);
        };
    };

    return (
        <div className={css['formRegister']}>
            <form action={handleSubmit}>
                <input name='name' type="text" placeholder='Enter your name' required />
                <input name='email' type="email" placeholder='Enter your email' required />
                <input name='password' type="password" placeholder='Enter your password' required />
                {errMessage && <p>{errMessage}</p>}
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default FormRegister;