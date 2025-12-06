// react
import style from './mealcard.module.css';
import Button from '../../ui/button/button';
import ActionButton from '../mealActionButton/actionButton';

// react router
import { useNavigate } from 'react-router';

// icons
import { FaStar, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const MealCard = ({ meal }) => {
    const navigate = useNavigate()

    const handleDetailsClick = () => {
        navigate(`/mealDetails/${meal.id}`, { replace: true })
    }
    return (
        <div className={style.card}>
            <div className={style.imageContainer}>
                <img src={meal.image} alt={meal.name} className={`${style.image} ${!meal.available ? style.unavailable : ""}`} />

                {/* Top Overlay */}
                <div className={style.topOverlay}>
                    <div className={style.nameContainer}>
                        <h3 className={style.name}>{meal.name}</h3>
                        <span className={style.category}>{meal.categoryFood}</span>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statItem}>
                            <FaStar className={style.starIcon} />
                            <span>{meal.rating}</span>
                        </div>
                        <div className={style.price}>${meal.price}</div>
                    </div>
                </div>

                {/* Bottom Overlay */}
                <div className={style.bottomOverlay}>
                    <div className={style.availability}>
                        {meal.available ? (
                            <span className={style.available}>
                                <FaCheckCircle /> Available
                            </span>
                        ) : (
                            <span className={style.unavailable}>
                                <FaTimesCircle /> Sold Out
                            </span>
                        )}
                    </div>
                    <div className={style.action}>
                        {meal.available && <ActionButton meal={meal} />}
                        
                        <Button
                            type="button"
                            content={<><FaInfoCircle /> Details</>}
                            className={style.detailsBtn}
                            onClick={handleDetailsClick}
                            disabled={!meal.available}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
