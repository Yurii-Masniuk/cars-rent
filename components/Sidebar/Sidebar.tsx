'use client';

import Link from 'next/link';
import css from './Sidebar.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/services/auth';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth';

const SideBar = () => {
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
        <aside className={css.sidebar}>
            
            <div className={css.logoContainer}>
                <h2>DriveGo Admin</h2>
            </div>

            <nav className={css.nav}>
                <div className={css.authLinks}>
                    <Link href="/admin/dashboard" className={css.link}>Dashboard</Link>
                    <Link href="/admin/cars" className={css.link}>Автомобілі</Link>
                    <Link href="/admin/locations" className={css.link}>Локації</Link>
                    <Link href="/admin/users" className={css.link}>Користувачі</Link>
                </div>
            </nav>

            <div className={css.logoutContainer}>
                <button onClick={handleLogout} className={css.logoutBtn}>
                    Вийти з акаунта
                </button>
            </div>

            {errMessage && <p className={css.error}>{errMessage}</p>}

        </aside>
    );
};

export default SideBar;