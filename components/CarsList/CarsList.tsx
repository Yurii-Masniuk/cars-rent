'use client';

import css from './CarsList.module.css';
import CarItem from './CarItem/CarItem';
import { useEffect, useState } from 'react';
import { getCars } from '@/services/cars';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useIsAdmin } from '@/hooks/useIsAdmin';

const CarsList = () => {
    // const isAdmin = useIsAdmin();
  const [page, setPage] = useState<number>(1);
  const [errMessage, setErrMessage] = useState<string | null>(null);
    
    const queryCars = useQuery({
        queryKey: ['cars', page],
        queryFn: () => getCars(page),
    });

    const cars = queryCars.data?.cars;
    const hasPreviousPage = queryCars.data?.hasPreviousPage;
    const hasNextPage = queryCars.data?.hasNextPage;
    const isLoading = queryCars.isLoading;
    const error = queryCars.error;

    useEffect(() => {        

        if (error) {
            const err = error as AxiosError<{ message: string }>;
        
            const status = err.response?.status;
            
            switch (status) {
                case 400:
                    setErrMessage("Некоректний запит. Перевірте параметри.");
                    break;
                case 401:
                    setErrMessage("Будь ласка, увійдіть у систему.");
                    break;
                case 404:
                    setErrMessage("Автомобілі не знайдено.");
                    break;
                default:
                    if (status && status >= 500) {
                        setErrMessage("Помилка на сервері. Спробуйте пізніше.");
                    } else {
                        setErrMessage(err.response?.data?.message || err.message || "Не вдалося завантажити список автомобілів.");
                    }
                    break;
            }
        } else { setErrMessage(null) }
    }, [error, setErrMessage]);
        
        
    return (
        <div>

            {isLoading && <p className={css.loading}>Завантаження...</p>}
            {errMessage && <p className={css.error}>{errMessage}</p>}

            {cars && <ul className={css.carsList}>
                {cars.map((el) => (
                    <CarItem key={el._id} element={el} />
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

export default CarsList;