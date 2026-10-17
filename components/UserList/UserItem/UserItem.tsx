import { User } from '@/types/users';
import css from './UserItem.module.css';
import Link from 'next/link';

interface UserItemProps{
    element: User,
};

const UserItem = ({ element }: UserItemProps) => {
    
    return (
        <li className={css.userItem}>
            <div className={css.content}>
                <h3>Користувач: {element.name}</h3>
                <ul className={css.specs}>
                    <li>Статус: {element.role}</li>
                    <li>
                        Доступ:{' '}
                        <span className={element.isBlocked ? css.statusBlocked : css.statusActive}>
                            {element.isBlocked ? 'Заблоковано' : 'Дозволено'}
                        </span>
                    </li>
                </ul>
                <Link href={`/admin/users/${element._id}`} className={css.detailsBtn}>
                    Деталі користувача
                </Link>
            </div>
        </li>
    );
};

export default UserItem;