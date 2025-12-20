// local
import { UserContext } from "./context/context";
import getUserData from "./firebase/getUserData";
import NavBar from "./components/navBar/navBar";
import Footer from "./components/footer/footer";

// react
import { useEffect, useContext } from "react";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// react router
import { Outlet } from "react-router";

function App() {
    const { setUserDetails } = useContext(UserContext);

    // listen to login user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                async function getUser() {
                    const userData = await getUserData();
                    console.log(userData);
                    setUserDetails(userData);
                }
                getUser();
            } else {
                setUserDetails(null);
            }
        });

        return () => unsubscribe();
    }, []);
    return (
        <div className="all-page">
            <nav>
                <NavBar />
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
