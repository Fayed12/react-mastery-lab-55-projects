// axios
import axios from "axios";

const getPopularMeals = async (selectedCategory) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching popular meals:", error);
        throw error;
    }
};

export default getPopularMeals;