import { Car } from '@/types/cars';
import css from './CarItem.module.css';
import Link from 'next/link';

interface CarItemProps{
    element: Car;
};

const CarItem = ({ element }: CarItemProps) => {
    const carImage = element.images?.[0];
    
    return (
            
        <li className={css.carItem}>

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