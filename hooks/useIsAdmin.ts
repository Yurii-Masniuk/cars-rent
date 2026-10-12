import { useAuthStore } from "@/stores/auth"

export const useIsAdmin = () => {
    const user = useAuthStore(s => s.user);
    return user?.role === 'admin';
};