import { Location } from '@/types/locations';
import css from './LocationItem.module.css';

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
      
        </div>
    );
};

export default LocationItem;