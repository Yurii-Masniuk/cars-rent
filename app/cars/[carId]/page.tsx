import css from './page.module.css';
import { getCarById } from '@/services/cars';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ carId: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { carId } = await params;
    const element = await getCarById(carId);
    const carImage = element.images?.[0];

    return (
        <main className={css.container}>
            <Link href="/cars" className={css.backBtn}>
                &larr; Назад до каталогу
            </Link>

            <div className={css.carItem}>

                <div className={css.imageWrapper}>
                    {carImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={carImage}
                            alt={`${element.brand} ${element.model}`}
                            className={css.image}
                        />
                    ) : (
                        <span className={css.noImage}>Немає фото</span>
                    )}
                </div>

                <div className={css.content}>

                    <h3>{element.brand} {element.model}</h3>
                    <p className={css.price}><b>{element.pricePerDay} $</b> / день</p>

                    <ul className={css.specs}>
                        <li>
                            <span>Статус авто:</span>{' '}
                            <span className={
                                element.status === 'active'
                                    ? css.statusActive
                                    : element.status === 'maintenance'
                                        ? css.statusMaintenance
                                        : css.statusInactive
                            }>
                                {element.status === 'active' && 'Активний'}
                                {element.status === 'maintenance' && 'На обслуговуванні'}
                                {element.status === 'inactive' && 'Неактивний'}
                            </span>
                        </li>
                        <li><span>Рік:</span> {element.year}</li>
                        <li><span>Категорія:</span> {element.category}</li>
                        <li><span>Коробка передач:</span> {element.transmission}</li>
                        <li><span>Тип пального:</span> {element.fuelType}</li>
                        <li><span>Кількість місць:</span> {element.seats}</li>
                        <li><span>Колір:</span> {element.color}</li>
                        <li><span>Пробіг:</span> {element.mileage}</li>
                        <li><span>Місце знаходження:</span>{element.locationId}</li>  
                    </ul>

                </div>

            </div>
        </main>
    );
};

export default Page;