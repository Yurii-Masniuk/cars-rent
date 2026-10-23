'use client';

import css from './CarsListAdmin.module.css';
import { useState } from 'react';
import { getCars } from '@/services/cars';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import CarItemAdmin from './CarItemAdmin/CarItemAdmin';
// import { useIsAdmin } from '@/hooks/useIsAdmin';

export interface CarsListProps {
    isAdminPage?: boolean,
};

const CarsListAdmin = ({isAdminPage}: CarsListProps) => {
    // const isAdmin = useIsAdmin();
    const [page, setPage] = useState<number>(1);
    
    const queryCars = useQuery({
        queryKey: ['cars', page],
        queryFn: () => getCars(page),
    });

    const cars = queryCars.data?.cars;
    const hasPreviousPage = queryCars.data?.hasPreviousPage;
    const hasNextPage = queryCars.data?.hasNextPage;
    const isLoading = queryCars.isLoading;
    const error = queryCars.error;

    const getErrorMessage = () => {
        if (!error) return null;
        const err = error as AxiosError<{ message: string }>;
        const status = err.response?.status;

        switch (status) {
            case 400:
                return "Некоректний запит. Перевірте параметри.";
            case 401:
                return "Будь ласка, увійдіть у систему.";
            case 404:
                return "Автомобілі не знайдено.";
            default:
                if (status && status >= 500) {
                    return "Помилка на сервері. Спробуйте пізніше.";
                } else {
                    return err.response?.data?.message || err.message || "Не вдалося завантажити список автомобілів.";
                };
        };
    };

    const errMessage = getErrorMessage();
        
    return (
        <div>

            {isLoading && <p className={css.loading}>Завантаження...</p>}
            {errMessage && <p className={css.error}>{errMessage}</p>}

            {cars && <ul className={css.carsList}>
                {cars.map((el) => (
                    <div key={el._id}>
                        <CarItemAdmin key={el._id} element={el} />
                        {/* {isAdminPage && <button >Редагувати</button>} */}
                        </div>
                ))}
            </ul>}

            {!isLoading && !error && !cars && <p className={css.noCars}>Автомобілів не знайдено</p>}

            <div className={css.carsPagination}>
                <button
                    className={css.carsButton}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={!hasPreviousPage || isLoading}>
                    -
                </button>
                
                <span className={css.pageNumber}>{page}</span>

                <button
                    className={css.carsButton}
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!hasNextPage || isLoading}>
                    +
                </button>
            </div>

        </div>
        
    );
};

export default CarsListAdmin;