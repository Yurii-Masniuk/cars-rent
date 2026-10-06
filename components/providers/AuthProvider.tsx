'use client';

import { getMe, refresh } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useAuthStore((s) => s.isAuth);
    const setUser = useAuthStore((s) => s.setUser);
    const clearUser = useAuthStore((s) => s.clearUser);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuth) return;
            try {
                await refresh();
                const user = await getMe();
                setUser(user);
            } catch {
                clearUser();
            }
        };
        fetchData();
    }, [isAuth, setUser, clearUser]);

    return children;
};

export default AuthProvider;