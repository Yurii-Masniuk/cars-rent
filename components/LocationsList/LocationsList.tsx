'use client';

import { useState } from 'react';
import css from './LocationsList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getLocations } from '@/services/locations';
import { AxiosError } from 'axios';
import LocationItem from './LocationItem/LocationItem';

const LocationsList = () => {

    const [page, setPage] = useState<number>(1);
        
        const queryCars = useQuery({
            queryKey: ['locations', page],
            queryFn: () => getLocations(page),
        });
    
        const locations = queryCars.data?.locations;
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
                    return "Локації не знайдено.";
                default:
                    if (status && status >= 500) {
                        return "Помилка на сервері. Спробуйте пізніше.";
                    } else {
                        return err.response?.data?.message || err.message || "Не вдалося завантажити список локацій.";
                    };
            };
        };
    
        const errMessage = getErrorMessage();

    return (
        <div className={css.locationsList}>
          
            {isLoading && <p className={css.loading}>Завантаження...</p>}
            {errMessage && <p className={css.error}>{errMessage}</p>}

            {locations && <ul className={css.carsList}>
                {locations.map((el) => (
                    <div key={el._id}>
                        <LocationItem key={el._id} element={el} />
                    </div>
                ))}
            </ul>}

            <div className={css.carsPagination}>
                <button
                    className={css.carsButton}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={!hasPreviousPage || isLoading}>
                   &larr; Попередня
                </button>
                
                <span className={css.pageNumber}>{page}</span>

                <button
                    className={css.carsButton}
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!hasNextPage || isLoading}>
                    Наступна &rarr;
                </button>
            </div>

        </div>
    );
};

export default LocationsList;