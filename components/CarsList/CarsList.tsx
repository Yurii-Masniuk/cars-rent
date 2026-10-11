import { Car } from '@/types/cars';
import css from './CarsList.module.css';
import CarItem from './CarItem/CarItem';

interface CarsListProps{
    cars: Car[];
};

const CarsList = ({ cars }: CarsListProps) => {
    if (!cars || cars.length === 0) {
        return <p className={css.noCars}>Автомобілів не знайдено</p>;
    };

    return (
        <ul className={css.carsList}>
            {cars.map((el) => (
                <CarItem key={el._id} element={el} />
            ))}
        </ul>
    );
};

export default CarsList;