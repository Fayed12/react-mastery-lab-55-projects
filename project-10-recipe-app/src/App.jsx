// react router
import { Outlet } from "react-router";

// local
import NavBar from "./components/nav/nav";
import Footer from "./components/footer/footer";

function App() {
    return (
        <div className="all-page">
            <nav>
                <NavBar/>
            </nav>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
