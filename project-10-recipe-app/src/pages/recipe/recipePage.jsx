// local
import style from "./recipePage.module.css";
import usegetIngredients from "../../hooks/getIngredients";
import getRecipe from "../../services/getRecip";

// react icons
import { FaSearch, FaYoutube, FaUtensils, FaMapMarkerAlt, FaList, FaRulerCombined, FaPlay } from "react-icons/fa";

// react
import { useEffect, useState } from "react";

// react router
import { useSearchParams } from "react-router";


function RecipePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const meal = recipe?.[0];
    const query = searchParams.get("query") || "";


    // handle submit serch value
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchParams({ query: searchTerm });
        setSearchTerm(() => "");
    }

    // handle seach to get recipe
    useEffect(() => {
        if (query) {
            const fetchRecipe = async () => {
                const recipeData = await getRecipe(query);
                setRecipe(recipeData);
                setIngredients(usegetIngredients(recipeData?.[0]) || []);
            }
            fetchRecipe();
        }
    }, [query])

    return (
        <div className={style.recipePage}>
            {/* Search Section */}
            <div className={style.searchSection}>
                <div className={style.searchContainer}>
                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Search for a delicious recipe..."
                            className={style.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className={style.searchButton} type="submit">
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>

            {/* Recipe Card */}
            <div className={style.recipeCard}>
                <div className={style.cardHeader}>
                    <div className={style.headerTop}>
                        <h1 className={style.mealTitle}>{meal?.strMeal}</h1>
                        <div className={style.badges}>
                            <span className={`${style.badge} ${style.badgeCategory}`}>
                                <FaUtensils /> {meal?.strCategory}
                            </span>
                            <span className={`${style.badge} ${style.badgeArea}`}>
                                <FaMapMarkerAlt /> {meal?.strArea}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={style.cardContent}>
                    {/* Left Column: Image */}
                    <div className={style.imageSection}>
                        <img
                            src={meal?.strMealThumb}
                            alt={meal?.strMeal}
                            className={style.mealImage}
                        />
                        <div className={style.videoSection}>
                            <a
                                href={meal?.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={style.youtubeLink}
                            >
                                <FaYoutube size={24} /> Watch Video Tutorial
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className={style.detailsSection}>
                        {/* Instructions */}
                        <div className={style.instructions}>
                            <h3 className={style.sectionTitle}>
                                <FaList /> Instructions
                            </h3>
                            <p className={style.instructionsText}>
                                {meal?.strInstructions}
                            </p>
                        </div>

                        {/* Ingredients */}
                        <div className={style.ingredients}>
                            <h3 className={style.sectionTitle}>
                                <FaRulerCombined /> Ingredients
                            </h3>
                            <div className={style.ingredientsGrid}>
                                {ingredients.map((item, index) => (
                                    <div key={index} className={style.ingredientCard}>
                                        <FaPlay className={style.measureIcon} size={12} />
                                        <div className={style.ingredientInfo}>
                                            <span className={style.ingredientName}>{item.ingredient}</span>
                                            <span className={style.ingredientMeasure}>{item.measure}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipePage;
