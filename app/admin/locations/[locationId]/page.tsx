import css from './page.module.css';
import { cookies } from 'next/headers';
import { globalServer } from '@/services/server-config';
import Link from 'next/link';
import { Location } from '@/types/locations';

interface PageProps{
    params: Promise<{ locationId: string }>,
};

const Page = async ({ params }: PageProps) => {
    const { locationId } = await params;
        const cookieStore = await cookies();
        const res = await globalServer.get<Location>(`/locations/${locationId}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        const element = res.data;

    return (
        <main className={css.container}>
            <Link href="/admin/locations" className={css.backBtn}>
                &larr; Назад до списку локацій
            </Link>
      
            <h1>Admin locations details</h1>

            <div className={css.locationItem}>

                <div className={css.content}>

                    <h3>Місто: {element.city}</h3>
                    
                    <ul className={css.specs}>
                        <li>
                            <span>Статус:</span>
                            <span className={element.isActive ? css.statusActive : css.statusInactive}>
                                {element.isActive ? 'Активна' : 'Неактивна'}
                            </span>
                        </li>
                        <li><span>Назва локації:</span> {element.name}</li>
                        <li><span>Адреса:</span> {element.address}</li>
                        <li><span>Телефон:</span> {element.phone}</li>
                        <li><span>Час роботи:</span> {element.openingTime} - {element.closingTime}</li>
                    </ul>

                    {/* <BtnEditCars element={element} /> */}

                </div>

            </div>

        </main>
    );
};

export default Page;