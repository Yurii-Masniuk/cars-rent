'use client';

import { useQuery } from '@tanstack/react-query';
import css from './DashboardStatsCards.module.css';
import { getDashboardStatistic } from '@/services/admin';
import { AxiosError } from 'axios';

const DashboardStatsCards = () => {

  const queryData = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => getDashboardStatistic(),
  });

  const data = queryData.data;
  const isLoading = queryData.isLoading;
  const error = queryData.error;

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
        return "Немає даних.";
      default:
        if (status && status >= 500) {
          return "Помилка на сервері. Спробуйте пізніше.";
        } else {
          return err.response?.data?.message || err.message || "Не вдалося отримати загальну кількість автомобілів.";
        };
    };
  };
  
  const errMessage = getErrorMessage();

  const {
    totalCars = 0,
    activeCars = 0,
    totalUsers = 0,
    activeBookings = 0,
    monthRevenue = 0,
    monthRentalDays = 0,
  } = data || {};

  return (
    <div className={css.cardsGrid}>

      {isLoading && <p className={css.loading}>Завантаження...</p>}
      {errMessage && <p className={css.error}>{errMessage}</p>}
      
      <ul className={css.cardList}>
        <li className={css.card}>
          <span className={css.cardTitle}>Загальна кількість автомобілів</span>
          <p className={css.cardValue}>
            {totalCars} <span className={css.cardUnit}>шт.</span>
          </p>
        </li>
        <li className={css.card}>
          <span className={css.cardTitle}>Кількість активних автомобілів</span>
          <p className={css.cardValue}>
            {activeCars} <span className={css.cardUnit}>шт.</span>
          </p>
        </li>
        <li className={css.card}>
          <span className={css.cardTitle}>Загальна кількість користувачів</span>
          <p className={css.cardValue}>
            {totalUsers} <span className={css.cardUnit}>од.</span>
          </p>
        </li>
        <li className={css.card}>
          <span className={css.cardTitle}>Кількість активних бронювань</span>
          <p className={css.cardValue}>
            {activeBookings} <span className={css.cardUnit}>од.</span>
          </p>
        </li>
        <li className={css.card}>
          <span className={css.cardTitle}>Дохід за поточний місяць</span>
          <p className={css.cardValue}>${monthRevenue}</p>
        </li>
        <li className={css.card}>
          <span className={css.cardTitle}>Дні оренди за поточний місяць</span>
          <p className={css.cardValue}>
            {monthRentalDays} <span className={css.cardUnit}>днів</span>
          </p>
        </li>
      </ul>

      {!isLoading && !error && !totalCars && <p className={css.noTotalCars}>Немає даних</p>}
      
    </div>
  );
};

export default DashboardStatsCards;