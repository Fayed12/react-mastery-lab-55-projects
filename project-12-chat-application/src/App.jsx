// react router
import { Outlet } from "react-router";

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
    <div className="all-page">
      <main className="main-page">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
