// react router
import { RouterProvider } from "react-router";

// local router
import router from "./routers/mainRouter";
import { useState } from "react";
import WelcomePage from "./pages/welcomePage/welcomePage";

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    const welcomeShown = sessionStorage.getItem("welcomeShown");
    if (welcomeShown) {
      return welcomeShown === "false";
    }
    return true;
  });

  const handleWelcomeComplete = () => {
    sessionStorage.setItem("welcomeShown", "true");
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome ? (
        <WelcomePage onComplete={handleWelcomeComplete} />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App
