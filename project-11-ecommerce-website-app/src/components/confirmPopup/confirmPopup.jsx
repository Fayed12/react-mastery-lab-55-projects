// local
import style from './confirmPopup.module.css';
import Button from '../../ui/button/button';
import { clearCart } from '../../redux/menuSlice';

// react router
import { useNavigate } from 'react-router';

// react redux
import { useDispatch } from 'react-redux';

// toast
import toast from 'react-hot-toast';

function ConfirmPopup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    return (
        <div className={style.popup}>
            <p>Order confirmed!, we will contact you soon</p>

            <Button title="Next" content={"New Order"} type={"button"} onClick={() => {
                toast.loading("Loading new order...", { id: "loading-new-order" });
                setTimeout(() => {
                    navigate("/menu", { replace: true })
                    dispatch(clearCart());
                }, 1000);
                setTimeout(() => {
                    toast.success("New order loaded!", { id: "loading-new-order" });
                }, 1200);
            }} />
        </div>
    );
}

export default ConfirmPopup;