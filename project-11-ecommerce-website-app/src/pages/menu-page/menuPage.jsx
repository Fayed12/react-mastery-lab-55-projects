// react
import style from './menupage.module.css';
import { getMeals, getMealsStatus, getMealsError } from '../../redux/menuSlice';
import { getAllMeals } from '../../redux/menuSlice';
import LoadingSkilton from "../../components/loadingSkilton/loadingSkilton"
import MealCard from "../../components/mealcard/mealcard"

// RTK
import { useSelector, useDispatch } from 'react-redux'

// react 
import { useEffect } from 'react';

const MenuPage = () => {
  const dispatch = useDispatch()
  const meals = useSelector(getMeals)
  const status = useSelector(getMealsStatus)
  const error = useSelector(getMealsError)

  // check if there is meals in redux state
  useEffect(() => {
    if (meals.length === 0) {
      dispatch(getAllMeals())
    }
  }, [dispatch, meals])

  if (status === "loading") return <LoadingSkilton />

  if (status === "failed") return <div className={style.error}>Error: {error.message}</div>

  return (
    <div className={style.menuPage}>
      <h1 className={style.title}>Our Menu</h1>
      <div className={style.grid}>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
