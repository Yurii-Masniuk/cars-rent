import { Car } from '@/types/cars';
import css from './CarItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface CarItemProps{
    element: Car;
};

const CarItem = ({ element }: CarItemProps) => {
    const carImage = element.images?.[0];
    
    return (
            
        <li className={css.carItem}>

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
                    <li>Рік: {element.year}</li>
                    <li>Коробка передач: {element.transmission}</li>
                    <li>Тип пального: {element.fuelType}</li>
                    <li>Кількість місць: {element.seats}</li>
                </ul>

                <Link href={`/cars/${element._id}`} className={css.detailsBtn}>
                    Деталі автомобіля
                </Link>

            </div>
        </li>
    );
};

export default CarItem;