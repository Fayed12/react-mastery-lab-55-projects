// local
import { UserContext } from "./context/context";
import getUserData from "./firebase/getUserData";
import { ThemeContext } from "./context/context";

// react
import { useEffect, useContext } from "react";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// react router
import { Outlet } from "react-router";

function App() {
    const { setUserDetails, setLoading } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    
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
        if (theme=== "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        }else{
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    },[theme])
    return (
        <Outlet />
    );
}

export default App;
