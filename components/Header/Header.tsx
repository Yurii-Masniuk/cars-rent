'use client';

import Link from 'next/link';
import css from './Header.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { logout } from '@/services/auth';
import { AxiosError } from 'axios';
import { useState } from 'react';

const Header = () => {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const clearUser = useAuthStore((s) => s.clearUser);

    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        setErrMessage(null);
        setIsLoading(true);

        try {
            await logout();
            clearUser();
            router.push('/login');
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const message = err.response?.data?.message || err.message || 'ERROR';
            setErrMessage(message);
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <Link href="/" className={css.link}>Головна</Link>                
                <div className={css.authSection}>
                    {user ? (
                        <div className={css.userPanel}>
                            <span className={css.greeting}>Вітаємо, <b>{user.user.name}</b>!</span>
                            <button onClick={handleLogout} className={css.logoutBtn} disabled={isLoading}>
                                {isLoading ? 'Вихід...' : 'Вийти'}
                            </button>
                        </div>
                    ) : (
                        <div className={css.authLinks}>
                            <Link href="/login" className={css.link}>Логін</Link>
                            <Link href="/register" className={css.link}>Реєстрація</Link>
                        </div>
                    )}
                </div>
            </nav>
            {errMessage && <p className={css.error}>{errMessage}</p>}
        </header>
    );
};

export default Header;