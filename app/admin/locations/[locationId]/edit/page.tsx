import { cookies } from 'next/headers';
import css from './page.module.css';
import { globalServer } from '@/services/server-config';
import Link from 'next/link';
import { Location } from '@/types/locations';
import LocationFormEdit from '@/components/LocationFormEdit/LocationFormEdit';

interface PageProps{
    params: Promise<{ locationId: string }>,
};

const Page = async ({ params }: PageProps) => {
    const { locationId } = await params;
    const cookieStore = await cookies();
    const res = await globalServer.get<Location>(`locations/${locationId}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    const element = res.data;

    return (
        <main className={css.container}>
            <Link href={`/admin/locations/${locationId}`} className={css.backBtn}>
                &larr; Назад
            </Link>

            <h2 className={css.title}>Редагувати локацію:</h2>
            <LocationFormEdit location={element}/>
        </main>
    );
};

export default Page;