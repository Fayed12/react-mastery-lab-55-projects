// axios
import axios from "axios";

async function getRecipe(searchTerm) {
    try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        return res.data.meals;
    } catch (error) {
        console.log(error);
    }
}

export default getRecipe;
