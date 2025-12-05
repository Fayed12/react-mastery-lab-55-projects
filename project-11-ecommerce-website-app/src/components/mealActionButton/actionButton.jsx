// loacl
import style from './actionButton.module.css';
import Button from '../../ui/button/button';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/menuSlice';
import { getAllCart } from '../../redux/menuSlice';

// react-redux
import { useDispatch, useSelector } from 'react-redux';

function ActionButton({ meal }) {
    const cart = useSelector(getAllCart)
    const dispatch = useDispatch()
    console.log(cart)

    // handle increase quantity
    const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(meal))
    }

    // handle decrease quantity
    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity(meal))
    }

    // handle add to cart
    const handleAddToCart = () => {
        const newItem = {
            id: meal.id,
            name: meal.name,
            price: meal.price,
            quantity: 1,
            totalPrice: meal.price,
        }
        dispatch(addToCart(newItem))
    }

    // handle remove from cart
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(meal))
    }
    return (
        <div className={style.actionButton}>
            {cart.length === 0 ? (
                <Button type="button" title='addToCart' content="Add to Cart" onClick={handleAddToCart} />
            ) : (
                cart.map((m) => (
                    !(m.id === meal.id) ? (
                        <>
                            <Button type="button" title='addToCart' content="Add to Cart" onClick={handleAddToCart} />
                        </>
                    ) : (
                        <>
                            <div className={style.quantity}>
                                <Button type="button" title='decreaseQuantity' content="-" onClick={handleDecreaseQuantity} />
                                <span>{m.quantity}</span>
                                <Button type="button" title='increaseQuantity' content="+" onClick={handleIncreaseQuantity} />
                            </div>
                            <Button type="button" title='removeFromCart' content="Remove" onClick={handleRemoveFromCart} />
                        </>
                    )
                )
            ) )}
        </div>
    );
}

export default ActionButton