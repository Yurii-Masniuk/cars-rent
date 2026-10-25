'use client';

import Link from 'next/link';
import css from './BtnEditCars.module.css';
import { Car } from '@/types/cars';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteCar } from '@/services/cars';
import { AxiosError } from 'axios';

export interface BtnEditCarsProps {
    element: Car,
};

const BtnEditCars = ({ element }: BtnEditCarsProps) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: () => deleteCar(element._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            router.push('/admin/cars');
            router.refresh();
        },
        onError: (error: unknown) => {
            const err = error as AxiosError<{ message: string }>;
            setErrorMessage(err.response?.data?.message || err.message || "Помилка при видаленні автомобіля");
        },
    });

    const handleDelete = () => {
        if (window.confirm(`Ви дійсно хочете видалити автомобіль ${element.brand} ${element.model}?`)) {
            setErrorMessage(null);
            mutation.mutate();
        }
    };
    
    return (
        <div className={css.wrapper}>
            <div className={css.actionsWrapper}>
                <Link href={`/admin/cars/${element._id}/edit`} className={css.editBtn}>
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

export default BtnEditCars;