import { Location } from '@/types/locations';
import css from './LocationItem.module.css';
import Link from 'next/link';

interface LocationItemProps{
    element: Location,
};

const LocationItem = ({ element }: LocationItemProps) => {
    
    return (
        <div className={css.content}>
            <h3>Локація: {element.address}</h3>

            <ul className={css.specs}>
                <li>Назва локації: {element.name}</li>
                <li>Місто: {element.city}</li>
                <li>Телефон: {element.phone}</li>
            </ul>

            <Link href={`/admin/locations/${element._id}`} className={css.detailsBtn}>
                Деталі локації
            </Link>
      
        </div>
    );
};

export default LocationItem;