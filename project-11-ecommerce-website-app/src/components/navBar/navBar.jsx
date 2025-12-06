// local
import { FaShoppingCart } from "react-icons/fa";
import style from "./navBar.module.css"
import { getAllCart } from "../../redux/menuSlice";

// react router
import { NavLink,useLocation } from "react-router";

// react redux
import { useSelector } from "react-redux";

function NavBar() {
    const cart = useSelector(getAllCart);
    const totalQuantity = cart.reduce((total, meal) => total + meal.quantity, 0) || 0;
    const totalPrice = cart.reduce((total, meal) => total + meal.totalPrice, 0) || 0;

    const location = useLocation().pathname;
    return (
        <>
            <div className={style.navBar}>
                <div className={style.content}>
                    <ul>
                        <li>
                            <NavLink replace={true} to="home" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink replace={true} to="about" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>About</NavLink>
                        </li>
                        <li>
                            <NavLink replace={true} to="contact" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>Contact</NavLink>
                        </li>
                        <li>
                            <NavLink replace={true} to="menu" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>Menu</NavLink>
                        </li>
                    </ul>
                </div>
                {location !== "/cart" && (
                    <div className={style.cartIcon}>
                        <NavLink to="/cart" >
                            <FaShoppingCart />
                            <span className={style.cartCount}>{totalQuantity}</span>
                        </NavLink>
                        {totalQuantity > 0 && (
                            <div className={style.cartTotal}>
                                <span>${totalPrice}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default NavBar;