// react 
import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";

// local
import { setUser,setLoading } from "../redux/authSlice";

// firebase
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthProvider({ children }) {
    const dispatch = useDispatch()

    useEffect(() => {
            const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(setUser({ uid, email, displayName }));
            } else {
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
        });
        return () => unsub();
    }, [dispatch]);

    return children;
}