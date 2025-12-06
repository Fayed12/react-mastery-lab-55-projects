
// local
import style from "./cartItem.module.css";
import ActionButton from "../mealActionButton/actionButton";

function CartItem({ item }) {
    return (
        <div className={style.cartItem}>

            <div className={style.details}>
                <h3>{item.quantity}x &nbsp; {item.name}</h3>
                <p className={style.price}>Price: {item.price} EGP</p>
                <p className={style.total}>Total: {item.totalPrice} EGP</p>
            </div>

            <div className={style.actions}>
                <ActionButton meal={item} />
            </div>
        </div>
    );
}


export default CartItem