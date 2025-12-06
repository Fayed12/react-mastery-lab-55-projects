// local
import style from './checkoutItem.module.css';

const CheckoutItem = ({ meal }) => {
    return (
        <div className={style.orderItem}>
            <div>
                <h3>{meal.quantity} × {meal.name}</h3>
                <p className={style.price}>Price: {meal.price} EGP</p>
            </div>

            <p className={style.total}>Total: {meal.totalPrice} EGP</p>
        </div>
    );
};

export default CheckoutItem;