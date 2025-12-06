// local
import style from './cartpage.module.css';
import { getAllCart } from '../../redux/menuSlice';
import CartItem from '../../components/cartItem/cartItem';
import Button from '../../ui/button/button';

// react redux
import { useSelector } from 'react-redux';

// react router
import { NavLink,useNavigate } from 'react-router';

const CartPage = () => {
    const cart = useSelector(getAllCart);
    const totalItems = cart.length;
    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    const navigate = useNavigate()
    if (cart.length === 0) {
        return (
            <div className={style.emptyWrapper}>
                <p className={style.emptyCart}>Your cart is empty</p>
                <NavLink className={style.goMenu} to={"/menu"} replace={true}>Browse Menu</NavLink>
            </div>
        );
    }

    return (
        <div className={style.cartPage}>
            <h1 className={style.title}>Your Cart</h1>

            <div className={style.cartContainer}>
                <ul className={style.cartList}>
                    {cart.map(meal => (
                        <li className={style.cartListItem} key={meal.id}>
                            <CartItem item={meal} />
                        </li>
                    ))}
                </ul>

                <div className={style.summaryBox}>
                    <h3>Order Summary</h3>

                    <div className={style.summaryRow}>
                        <span>Total Items: </span>
                        <span className={style.totalItems}>{totalItems}</span>
                    </div>

                    <div className={style.summaryRow}>
                        <span>Total Price: </span>
                        <span className={style.totalPrice}>
                            {totalPrice} USD
                        </span>
                    </div>

                    <div className={style.buttons}>
                        <Button
                            type="button"
                            content="Back to Menu"
                            className={style.backBtn}
                            onClick={() => { navigate("/menu", { replace: true }) }}
                        />

                        <Button
                            type="button"
                            content="Proceed to Checkout"
                            className={style.checkoutBtn}
                            onClick={() => { navigate("/checkout") }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
