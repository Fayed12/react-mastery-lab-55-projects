// local
import style from './checkoutpage.module.css';
import Button from '../../ui/button/button';
import { getAllCart } from '../../redux/menuSlice';
import CheckoutItem from '../../components/ckeckoutItem/checkoutItem';
import ConfirmPopup from '../../components/confirmPopup/confirmPopup';
import { clearCart } from '../../redux/menuSlice';
import Input from "../../ui/input/input"

// react redux
import { useSelector, useDispatch } from 'react-redux';

// react hook form
import { useForm } from 'react-hook-form';

// react
import { useState } from 'react';

// react router
import { useNavigate } from 'react-router';

// toast
import toast from 'react-hot-toast';

// react icons
import { FaHome } from "react-icons/fa";

const CheckoutPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    const [userDetails, setUserDetails] = useState(() => {
        const storedUserDetails = sessionStorage.getItem("userDetails");
        return storedUserDetails ? JSON.parse(storedUserDetails) : null;
    });
    const openCheckout = userDetails !== null;
    const [address, setAddress] = useState(() => {
        const storedAddress = JSON.parse(sessionStorage.getItem("userDetails"));
        return  storedAddress?.address || "";
    });
    const [loading, setLoading] = useState(false);
    
    const cart = useSelector(getAllCart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((total, meal) => total + meal.totalPrice, 0);
    const totalQuantity = cart.reduce((total, meal) => total + meal.quantity, 0);

    // handle submit user data
    const onSubmit = (data) => {
        setUserDetails(data);
        sessionStorage.setItem("userDetails", JSON.stringify({ ...data, address }));
    };

    // handle confirm order
    const handleConfirmOrder = () => {
        toast.loading("wait....", { id: "confirming-order" });
        setTimeout(() => {
            setOpenPopup(true);
            toast.success("order confirmed, start new order now!", { id: "confirming-order" });
        }, 1000);
    };

    // handle cancel order
    const handleCancelOrder = () => {
        const confirmReset = window.confirm("Do you want to clear the cart?");
        if (confirmReset) {
            toast.loading("Canceling order...", { id: "canceling-order" });
            setTimeout(() => {
                dispatch(clearCart());
                navigate("/menu", { replace: true })
            }, 1000);
            setTimeout(() => {
                toast.success("Order canceled, start new one now!", { id: "canceling-order" });
            }, 1200);
        } else {
            toast.loading("Canceling order...", { id: "canceling-order" });
            setTimeout(() => {
                navigate("/menu", { replace: true })
            }, 1000);
            setTimeout(() => {
                toast.success("Order canceled,add new item now!", { id: "canceling-order" });
            }, 1200);
        }
        
    };

    // function get current location
    function getLocation(){

        setLoading(true);

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported in this browser.", { id: "failed-to-get-location" });
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                // GET ADDRESS FROM LAT/LNG
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );

                const data = await res.json();
                setAddress(data.display_name);
                setLoading(false);
            },
            () => {
                toast.error("Failed to get location.", { id: "failed-to-get-location" });
                setLoading(false);
            }
        );
    };

    if (!openCheckout || !userDetails) {
        return (
            <div className={style.formWrapper}>
                <h2 className={style.formTitle}>Enter Your Details</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                    <Input name="name" type="text" placeholder="Your Name" register={{
                        ...register("name", {
                            required: "Name is required", pattern: {
                                value: /^[a-zA-Z]+ [a-zA-Z ]+$/,
                                message: "Name must contain only letters and at least two words"
                            }
                        })
                    }} />
                    {errors.name && <p className="error">{errors.name.message}</p>}

                    <div className={style.address}>
                        <input name='address' type="text" placeholder="Your Address" value={address}
                            onChange={(e) => setAddress(e.target.value)} disabled={loading === true} required />
                        {address === "" && <Button
                            disabled={loading === true}
                            title="get location"
                            content={<FaHome />}
                            type={"button"}
                            onClick={() => getLocation()}
                        />}
                    </div>

                    <Input name="phone" type="tel" placeholder="Your Phone" register={{
                        ...register("phone", {
                            required: "Phone is required", pattern: {
                                value: /^01[0-9]{9}$/,
                                message: "Phone number must be 11 digits and start with 01"
                            }
                        })
                    }} />
                    {errors.phone && <p className="error">{errors.phone.message}</p>}

                    <Button title="Next" content={"Next"} type={"submit"} />
                </form>
            </div>
        );
    }

    return (
        <>
            <div className={style.checkoutPage}>
                <h2 className={style.sectionTitle}>Order Summary</h2>

                <div className={style.orderBox}>
                    {cart.map((meal) => <CheckoutItem meal={meal} key={meal.id} />)}
                </div>

                <div className={style.summaryFooter}>
                    <div className={style.userDetails}>
                        <p><strong>User:</strong> {userDetails?.name}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <p><strong>Phone:</strong> {userDetails?.phone}</p>
                    </div>
                    <div className={style.orderDetails}>
                        <p><strong>Delivery time:</strong> 30 Minuts</p>
                        <p><strong>Total Items:</strong> {totalQuantity}</p>
                        <p><strong>Total Price:</strong> {totalPrice} USD</p>
                    </div>
                </div>

                <div className={style.summaryFooterButtons}>
                    <Button
                        title="Next"
                        content={"confirm order"}
                        type={"button"}
                        onClick={() => handleConfirmOrder()}
                    />

                    <Button
                        title="Next"
                        content={"cancel & New Order"}
                        type={"button"}
                        onClick={() => handleCancelOrder()}
                    />
                </div>
            </div>
            {openPopup && <ConfirmPopup />}
        </>
    );
};

export default CheckoutPage;
