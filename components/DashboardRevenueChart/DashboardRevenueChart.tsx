'use client';

import { useQuery } from '@tanstack/react-query';
import css from './DashboardRevenueChart.module.css';
import { getRevenueByDays } from '@/services/admin';
import { AxiosError } from 'axios';

const DashboardRevenueChart = () => {

  const queryData = useQuery({
    queryKey: ['revenue-chart'],
    queryFn: () => getRevenueByDays(),
  });

  const revenueData = queryData.data?.revenueByDay;
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
          return err.response?.data?.message || err.message || "Не вдалося отримати графік доходів.";
        };
    };
  };
    
  const errMessage = getErrorMessage();

  return (
    <div className={css.chartCard}>

      {isLoading && <p className={css.loading}>Завантаження...</p>}
      {errMessage && <p className={css.error}>{errMessage}</p>}
      
      <div className={css.chartHeader}>
        <h3>Графік доходу та бронювань</h3>
        <span className={css.chartSubtitle}>Поточний місяць</span>
      </div>

      {!isLoading && !errMessage && revenueData && revenueData.length > 0 && (
        <div className={css.tableWrapper}>
          <table className={css.revenueTable}>
            <thead>
              <tr>
                <th>Дата / День</th>
                <th>Дохід ($)</th>
                <th>Бронювань</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((elem, index) => (
                <tr key={index}>
                  <td>{elem.date}</td>
                  <td className={css.revenueValue}>${elem.revenue}</td>
                  <td>{elem.bookingsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !errMessage && (!revenueData || revenueData.length === 0) && (
        <p className={css.noData}>Немає даних за поточний період</p>
      )}

    </div>
  );
};

export default DashboardRevenueChart;