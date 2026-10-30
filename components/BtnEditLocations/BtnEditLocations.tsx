'use client';

import Link from 'next/link';
import css from './BtnEditLocations.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Location } from '@/types/locations';
import { deleteLocation } from '@/services/locations';

export interface BtnEditLocationsProps {
    element: Location,
};

const BtnEditLocations = ({ element }: BtnEditLocationsProps) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: () => deleteLocation(element._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            router.push('/admin/locations');
            router.refresh();
        },
        onError: (error: unknown) => {
            const err = error as AxiosError<{ message: string }>;
            setErrorMessage(err.response?.data?.message || err.message || "Помилка при видаленні локації");
        },
    });

    const handleDelete = () => {
        if (window.confirm(`Ви дійсно хочете видалити локацію ${element.name} м.${element.city}?`)) {
            setErrorMessage(null);
            mutation.mutate();
        }
    };
    
    return (
        <div className={css.wrapper}>
            <div className={css.actionsWrapper}>
                <Link href={`/admin/locations/${element._id}/edit`} className={css.editBtn}>
                    Редагувати
                </Link>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={mutation.isPending}
                    className={css.deleteBtn}
                >
                    {mutation.isPending ? 'Видалення...' : 'Видалити'}
                </button>
            </div>
            {errorMessage && <p className={css.errorText}>{errorMessage}</p>}
        </div>
    );
};

export default BtnEditLocations;