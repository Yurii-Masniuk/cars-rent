'use client';

import CarsList from '@/components/CarsList/CarsList';
import css from './page.module.css';
import { getCars } from '@/services/cars';
import { useEffect, useState } from 'react';
import { Car } from '@/types/cars';
import { AxiosError } from 'axios';

const Page = () => {

  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setErrMessage(null);
        const data = await getCars({});
        setCars(data.cars || data);
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
  }, []);
  
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список автомобілів</h2>

      {isLoading && <p className={css.loading}>Завантаження...</p>}

      {errMessage && <p className={css.error}>{errMessage}</p>}

      {!isLoading && !errMessage && <CarsList cars={cars} />}
    </main>
  );
};

export default Page;