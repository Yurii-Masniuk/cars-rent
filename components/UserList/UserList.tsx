'use client';

import css from './UserList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/users';
import { AxiosError } from 'axios';
import UserItem from './UserItem/UserItem';

const UserList = () => {

    const queryUsers = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  const users = queryUsers.data?.users;
  const isLoading = queryUsers.isLoading;
  const error = queryUsers.error;

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
        return "Користувачів не знайдено.";
      default:
        if (status && status >= 500) {
          return "Помилка на сервері. Спробуйте пізніше.";
        } else {
          return err.response?.data?.message || err.message || "Не вдалося завантажити список користувачів.";
        };
    };
  };
  
  const errMessage = getErrorMessage();

  return (
    <div>

      {isLoading && <p className={css.loading}>Завантаження...</p>}
      {errMessage && <p className={css.error}>{errMessage}</p>}

      {users && <ul className={css.usersList}>
        {users.map((el) => (
          <UserItem key={el._id} element={el} />
        ))}
      </ul>}

      {!isLoading && !error && !users && <p className={css.noUsers}>Користувачів не знайдено</p>}

    </div>
  );
};

export default UserList;