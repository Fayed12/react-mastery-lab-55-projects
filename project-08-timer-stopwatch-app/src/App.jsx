// local
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

// react router
import { Outlet } from "react-router";  

function App() {
  return (
    <>
      <Header />
      <main aria-label="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
