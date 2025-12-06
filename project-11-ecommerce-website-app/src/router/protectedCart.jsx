// local
import toast from "react-hot-toast";
import { getAllCart } from "../redux/menuSlice";

// react redux
import { useSelector } from "react-redux";


// react router
import { Navigate } from "react-router";

function ProtectedCart({ children }) {
    const cart = useSelector(getAllCart);

    if (cart.length === 0) {
        toast.error("Please add at least one item to open Cart!", { id: "empty-cart" });
        return <Navigate to="/menu" />;
    }

    return (
        <>
            {children}
        </>
    );
}

export default ProtectedCart;