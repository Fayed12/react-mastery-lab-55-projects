// react
import { useState, useEffect } from "react";

// local
import style from "./Popular.module.css";
import getPopularMeals from "../../services/getPopularMeals";

// react icons
import { FaArrowRight } from "react-icons/fa";

// react router
import { useNavigate } from "react-router";

function PopularPage() {
    const [selectedCategory, setSelectedCategory] = useState("Chicken");
    const [meals, setMeals] = useState([]);
    const categories = ["Chicken", "Beef", "Dessert", "Pasta", "Seafood"];
    const navigate = useNavigate();

    // handle navigate to recipe page
    const handleNavigate = (name) => {
        navigate(`/recipe?query=${name}`, {replace: true});
    };

    //handle not fetching data again and again
    useEffect(() => {
            const fetchMeals = async () => {
                const data = await getPopularMeals(selectedCategory);
                setMeals(data.meals);
                localStorage.setItem(`meals-${selectedCategory}`, JSON.stringify(data.meals));
            };

            fetchMeals();
    }, [selectedCategory]);

    return (
        <div className={style.container}>
            <h1 className={style.title}>Popular Meals</h1>

            <div className={style.categories}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`${style.categoryBtn} ${selectedCategory === category ? style.active : ""
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className={style.grid}>
                {meals.map((meal) => (
                    <div key={meal.idMeal} className={style.card}>
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            className={style.image}
                        />
                        <div className={style.overlay}>
                            <h3 className={style.mealTitle}>{meal.strMeal}</h3>
                            <button className={style.detailsBtn} onClick={() => handleNavigate(meal.strMeal)}>
                                View Details <FaArrowRight className={style.icon} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularPage;
