import { cookies } from 'next/headers';
import css from './page.module.css';
import { globalServer } from '@/services/server-config';
import Link from 'next/link';
import { Car } from '@/types/cars';
import CarFormEdit from '@/components/CarsList/CarFormEdit/CarFormEdit';

interface PageProps{
    params: Promise<{ carsId: string }>,
};

const Page = async ({ params }: PageProps) => {
    const { carsId } = await params;
    const cookieStore = await cookies();
    const res = await globalServer.get<Car>(`cars/${carsId}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    const element = res.data;

    return (
        <main className={css.container}>
            <Link href={`/admin/cars/${carsId}`} className={css.backBtn}>
                &larr; Назад
            </Link>

            <h2 className={css.title}>Редагувати авто:</h2>
            <CarFormEdit car={element} />
        </main>
    );
};

export default Page;