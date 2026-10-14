import { User } from '@/types/users';
import css from './UserItem.module.css';
import Link from 'next/link';

interface UserItemProps{
    element: User,
};

const UserItem = ({element}:UserItemProps) => {
    return (
        <li className={css.userItem}>
            <div className={css.content}>
                <h3>Користувач: {element.name}</h3>
                <ul className={css.specs}>
                    <li>Статус: {element.role}</li>
                    <li>E-mail: {element.email}</li>
                    <li>Тел: {element.phone}</li>
                    <li>Номер ID: {element._id}</li>
                    <li>Доступ: {element.isBlocked ? 'Заблоковано' : 'Доступ дозволено'}</li>
                </ul>
                <Link href={`/admin/users/${element._id}`} className={css.detailsBtn}>
                    Детальніше / Редагувати
                </Link>
            </div>
        </li>
    );
};

export default UserItem;