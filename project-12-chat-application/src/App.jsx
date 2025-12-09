// react router
import { Outlet } from "react-router";

// local
import SideBar from "./components/SideBar/SideBar"
import AppHeader from "./components/AppHeader/AppHeader";

// local
// import WelcomePage from "./pages/welcome/welcomePage"

// react
// import { useEffect, useState } from "react";

function App() {

  // const [openWelcome, setOpenWelcome] = useState(() => {
  //   const open = sessionStorage.getItem("welcome");
  //   if (open) {
  //     return open === "true";
  //   }
  //   return true;
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpenWelcome(false);
  //     sessionStorage.setItem("welcome", "false");
  //   }, 3000);
  // }, []);

  // if (openWelcome) {
  //   return <WelcomePage />;
  // }
  return (
    <div className={`all-page`}>
      <div className="sidebar">
        <SideBar />
      </div>
      <main className="main-page">
        <div className="app-header">
          <AppHeader />
        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
