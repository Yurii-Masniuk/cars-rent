import Link from 'next/link';
import css from './BtnEditCars.module.css';
import { Car } from '@/types/cars';

export interface BtnEditCarsProps {
    element: Car,
};

const BtnEditCars = ({ element }: BtnEditCarsProps) => {
    
    return (
        <div>
            <Link href={`/admin/cars/${element._id}/edit`} className={css.detailsBtn}>
                Редагувати
            </Link>
            <Link href={`/cars`} className={css.detailsBtn}>
                Видалити
            </Link>
            
        </div>
    );
};

export default BtnEditCars;