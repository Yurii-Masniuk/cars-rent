'use client';

import Link from 'next/link';
import css from './Sidebar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/services/auth';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth';

const SideBar = () => {
    const router = useRouter();
    const clearUser = useAuthStore((s) => s.clearUser);
    const pathname = usePathname();

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

    const navLinks = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/cars', label: 'Автомобілі' },
        { href: '/admin/locations', label: 'Локації' },
        { href: '/admin/users', label: 'Користувачі' },
    ];

    return (
        <aside className={css.sidebar}>

            <nav className={css.nav}>
                <div className={css.authLinks}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${css.link} ${isActive ? css.active : ''}`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className={css.logoutContainer}>
                <button onClick={handleLogout} className={css.logoutBtn} disabled={isLoading}>
                    {isLoading ? 'Вихід...' : 'Вийти з акаунта'}
                </button>
            </div>

            {errMessage && <p className={css.error}>{errMessage}</p>}

        </aside>
    );
};

export default SideBar;