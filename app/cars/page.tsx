'use client';

import CarsList from '@/components/CarsList/CarsList';
import css from './page.module.css';
import { getCars } from '@/services/cars';
import { useEffect, useState } from 'react';
import { Car } from '@/types/cars';
import { AxiosError } from 'axios';

const Page = () => {

  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setErrMessage(null);
        setIsLoading(true);
        const data = await getCars(page);
        setCars(data.cars || data);
        setHasPreviousPage(data.hasPreviousPage);
        setHasNextPage(data.hasNextPage);
      } catch (error) {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [page]);
  
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список автомобілів</h2>

      {isLoading && <p className={css.loading}>Завантаження...</p>}

      {errMessage && <p className={css.error}>{errMessage}</p>}

      {!isLoading && !errMessage && <CarsList cars={cars} />}

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
    </main>
  );
};

export default Page;