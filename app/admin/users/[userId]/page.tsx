import css from './page.module.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { globalServer } from '@/services/server-config';
import { User } from '@/types/users';

interface PageProps{
    params: Promise<{userId: string}>,
};

const Page = async ({ params }: PageProps) => {
    const { userId } = await params;
    const cookieStore = await cookies();
    const res = await globalServer.get<User>(`/users/${userId}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    const element = res.data;

    const formatDate = (dateString: string) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <main className={css.container}>
            <Link href="/admin/users" className={css.backBtn}>
                &larr; Назад до списку
            </Link>

            <div className={css.userCard}>
                <div className={css.content}>
                    <h3>Користувач: {element.name}</h3>
                    <ul className={css.specs}>
                        <li><span>Статус:</span> {element.role}</li>
                        <li><span>E-mail:</span> {element.email}</li>
                        <li><span>Тел:</span> {element.phone}</li>
                        <li><span>ID користувача:</span> {element._id}</li>
                        <li>
                            <span>Доступ:</span>{' '}
                            <span className={element.isBlocked ? css.statusBlocked : css.statusActive}>
                                {element.isBlocked ? 'Заблоковано' : 'Дозволено'}
                            </span>
                        </li>
                        <li><span>Створено:</span> {formatDate(element.createdAt)}</li>
                        <li><span>Оновлено:</span> {formatDate(element.updatedAt)}</li>
                    </ul>
                    <Link href={`/admin/users/${element._id}/edit`} className={css.detailsBtn}>
                        Редагування користувача
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Page;