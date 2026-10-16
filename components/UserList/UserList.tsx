'use client';

import css from './UserList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/users';
import { AxiosError } from 'axios';
import UserItem from './UserItem/UserItem';
import { useState } from 'react';

const UserList = () => {

  const [page, setPage] = useState<number>(1);

  const queryUsers = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
  });

  const users = queryUsers.data?.users;
  const hasPreviousPage = queryUsers.data?.hasPreviousPage;
  const hasNextPage = queryUsers.data?.hasNextPage;
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

      <div className={css.usersPagination}>
        <button
          className={css.usersButton}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!hasPreviousPage || isLoading}>
          -
        </button>
                
        <span className={css.pageNumber}>{page}</span>

        <button
          className={css.usersButton}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage || isLoading}>
          +
        </button>
      </div>

    </div>

  );
};

export default UserList;