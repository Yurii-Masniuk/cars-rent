import CarBookingActions from '@/components/CarBookingActions/CarBookingActions';
import css from './page.module.css';
import { getCarById } from '@/services/cars';
import { getLocationById } from '@/services/locations';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ carId: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { carId } = await params;

    const element = await getCarById(carId);
    const carImage = element.images?.[0];

    const { locationId } = element;
    const elLocation = await getLocationById(locationId);

    return (
        <main className={css.container}>
            <Link href="/cars" className={css.backBtn}>
                &larr; Назад до каталогу
            </Link>

            <div className={css.carItem}>
                <div className={css.imageWrapper}>
                    {carImage ? (
                        <Image
                            width={500}
                            height={500}
                            src={carImage}
                            alt={`${element.brand} ${element.model}`}
                            className={css.image}
                        />
                    ) : (
                        <span className={css.noImage}>Немає фото</span>
                    )}
                </div>

                <div className={css.content}>

                    <div className={css.headerCenter}>
                        <h3>{element.brand} {element.model}</h3>
                        <p className={css.price}><b>{element.pricePerDay} $</b> / день</p>
                    </div>

                    <div className={css.contentColumns}>

                        <div className={css.columnCard}>
                            <h4>Характеристики</h4>

                            <ul className={css.specsList}>
                                <li><span>Місце знаходження:</span> {elLocation.city}</li>
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
                                <li><span>Пробіг:</span> {element.mileage} км</li>
                            </ul>
                        </div>

                        <div className={css.columnCard}>
                            <h4>Місце знаходження</h4>
                            <p><strong>Назва:</strong> {elLocation?.name || ''}</p>
                            <p><strong>Місто:</strong> {elLocation?.city || ''}</p>
                            <p><strong>Адреса:</strong> {elLocation?.address || ''}</p>
                            <p><strong>Телефон:</strong> {elLocation?.phone || ''}</p>
                            <p><strong>Години роботи:</strong> {elLocation?.openingTime} - {elLocation?.closingTime}</p>
                        </div>
                    </div>

                    <CarBookingActions 
                        carId={element._id} 
                        pricePerDay={element.pricePerDay} 
                        status={element.status} 
                    />
                </div>
            </div>
        </main>
    );
};

export default Page;