'use client';

import { register } from '@/services/auth';
import css from './RegisterForm.module.css';
import { useRouter } from 'next/navigation';

const FormRegister = () => {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const body = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        await register(body);
        router.push('/login');
    };

    return (
        <div className={css['formRegister']}>
            <form action={handleSubmit}>
                <input name='name' type="text" placeholder='Enter your name' required />
                <input name='email' type="email" placeholder='Enter your email' required />
                <input name='password' type="password" placeholder='Enter your password' required />
                <button>Register</button>
            </form>
        </div>
    );
};

export default FormRegister;