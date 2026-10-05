'use client';

import { getMe, login } from '@/services/auth';
import css from './LoginForm.module.css';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';

const FormLogin = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const body = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        await login(body);
        const res = await getMe();
        setUser(res);
        router.push('/');
    };

    return (
        <div className={css['formLogin']}>
            <form action={handleSubmit}>
                <input name='email' type="email" placeholder='Enter your email' />
                <input name='password' type="password" placeholder='Enter your password' />
                <button>Sign in</button>
            </form>
        </div>
    );
};

export default FormLogin;