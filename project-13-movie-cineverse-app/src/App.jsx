// local
import { UserContext } from "./context/context";
import getUserData from "./firebase/getUserData";
import { ThemeContext } from "./context/context";
import { DeatilsType } from "./context/context";
import { Favorites } from "./context/context";
import { auth, db } from "./firebase/firebaseConfig";
import useOnlineStatus from "./hooks/onlineStatue";
import OnlineMessage from "./components/online-message/onlineMessage";
import AnimatedCursor from "./components/animated-cursor/animatedCursor";

// react
import { useEffect, useContext } from "react";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

// react router
import { Outlet, useLocation } from "react-router";

function App() {
    const { setType } = useContext(DeatilsType);
    const { userDetails, setUserDetails, setLoading } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const { setFavData } = useContext(Favorites);
    const isOnline = useOnlineStatus();
    const location = useLocation()

    // listen to login user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userData = await getUserData(user);
                    setUserDetails(userData);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setUserDetails(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [setUserDetails, setLoading]);

    // set theme to body 
    useEffect(() => {
        if (theme === "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    }, [theme])

    // set page type
    useEffect(() => {
        if (location.pathname === "/tvs") {
            setType("tv")
        } else if (location.pathname === "/movies") {
            setType("movies")
        }
    }, [location, setType])

    // set fav data to context
    useEffect(() => {
        if (!userDetails?.id) return;

        const ref = doc(db, "users", userDetails.id);
        const unsubscribe = onSnapshot(ref, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data().favData;
                setFavData(data)
            }
        });
        return () => unsubscribe();
    }, [setFavData, userDetails])

    if (!isOnline) {
        return (
            <>
                <OnlineMessage />
                <AnimatedCursor/>
            </>
        )
    }

    return (
        <>
            <Outlet />
            <AnimatedCursor />
        </>
    );
}

export default App;
