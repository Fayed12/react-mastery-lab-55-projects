const usegetIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push({
                ingredient: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`]
            });
        }
    }
    return ingredients;
};

export default usegetIngredients;