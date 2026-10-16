import { cookies } from 'next/headers';
import css from './page.module.css';
import { globalServer } from '@/services/server-config';
import { User } from '@/types/users';
import UserFormEdit from '@/components/UserList/UserFormEdit/UserFormEdit';
import Link from 'next/link';

interface PageProps{
    params: Promise<{ userId: string }>,
};

const Page = async ({ params }: PageProps) => {
    const { userId } = await params;
    const cookieStore = await cookies();
    const res = await globalServer.get<User>(`users/${userId}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    const element = res.data;

    return (
        <main className={css.container}>
            <Link href="/admin/users" className={css.backBtn}>
                &larr; Назад до списку
            </Link>

            <h2 className={css.title}>Редагувати користувача:</h2>
            <UserFormEdit user={element} />
        </main>
    );
};

export default Page;