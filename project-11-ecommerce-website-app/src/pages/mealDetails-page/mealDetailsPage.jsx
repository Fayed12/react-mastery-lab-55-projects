// local
import style from './mealdetailspage.module.css';
import { getAllMeals, getMeals } from '../../redux/menuSlice';
import ActionButton from '../../components/mealActionButton/actionButton';
import Button from '../../ui/button/button';

// react
import { useEffect } from 'react';

// react router
import { useParams,useNavigate } from 'react-router';

// RTK
import { useSelector,useDispatch } from 'react-redux';

// icons
import { FaStar, FaHeart, FaClock, FaUtensils, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";

const MealDetailsPage = () => {
    const { id } = useParams();
    const meals = useSelector(getMeals);
    const dispatch = useDispatch()
    const meal = meals.find(meal => meal.id === id);
    const navigate = useNavigate();

    useEffect(() => {
        if (meals.length === 0) {
            dispatch(getAllMeals())
        } else {
            return
        }
    },[dispatch,meals])

    if (!meal) {
        return (
            <div className={style.pageContainer}>
                <h2 style={{ color: 'white' }}>Meal not found</h2>
            </div>
        );
    }

    return (
        <div className={style.pageContainer}>
            <div className={style.detailsWrapper}>

                {/* Left Side - Image */}
                <div className={style.imageContainer}>
                    <img src={meal.image} alt={meal.name} className={style.mealImage} />
                </div>

                {/* Right Side - Details */}
                <div className={style.infoContainer}>

                    {/* Header: Name & Price */}
                    <div className={style.header}>
                        <div className={style.titleRow}>
                            <h1 className={style.name}>{meal.name}</h1>
                            <span className={style.price}>${meal.price}</span>
                        </div>

                        {/* Meta: Rating, Likes, Time */}
                        <div className={style.metaRow}>
                            <div className={style.metaItem} title="Rating">
                                <FaStar className={style.rating} />
                                <span>{meal.rating}</span>
                            </div>
                            <div className={style.metaItem} title="Likes">
                                <FaHeart className={style.likes} />
                                <span>{meal.likes}</span>
                            </div>
                            <div className={style.metaItem} title="Preparation Time">
                                <FaClock />
                                <span>{meal.categoryTime}</span>
                            </div>
                            <div className={style.metaItem} title="Category">
                                <FaUtensils />
                                <span>{meal.categoryFood}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tags: Availability */}
                    <div className={style.badges}>
                        <span className={`${style.badge} ${meal.available ? style.available : style.unavailable}`}>
                            {meal.available ? <FaCheckCircle /> : <FaTimesCircle />}
                            {meal.available ? "Available" : "Out of Stock"}
                        </span>
                    </div>

                    {/* Description */}
                    <div className={style.descriptionSection}>
                        <h3 className={style.sectionTitle}>Description</h3>
                        <p className={style.description}>{meal.description}</p>
                    </div>

                    {/* Ingredients & Extras Grid */}
                    <div className={style.listsContainer}>
                        {meal.ingredients && meal.ingredients.length > 0 && (
                            <div className={style.listWrapper}>
                                <h3 className={style.sectionTitle}>Ingredients</h3>
                                <div className={style.list}>
                                    {meal.ingredients.map((ing, index) => (
                                        <span key={index} className={style.tag}>{ing}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {meal.extras && meal.extras.length > 0 && (
                            <div className={style.listWrapper}>
                                <h3 className={style.sectionTitle}>Extras</h3>
                                <div className={style.list}>
                                    {meal.extras.map((extra, index) => (
                                        <span key={index} className={style.tag}>{extra}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className={style.actionArea}>
                        <Button content={<><IoMdArrowRoundBack /> back</>} onClick={() => navigate("/menu", { replace: true })} />
                        <ActionButton meal={meal} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MealDetailsPage;
