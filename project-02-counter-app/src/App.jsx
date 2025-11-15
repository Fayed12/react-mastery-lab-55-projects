// local
import CounterPage from "./pages/counter-page/counter";
import WelcomePage from "./pages/welcome-page/welcome";

// react
import { useEffect, useState } from "react";

function App() {
  const [openWelcome, setOpenWelcome] = useState(true);

  /*========================================================================
                    close welcome page after specific time
  ==========================================================================*/
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenWelcome(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  return <>{openWelcome ? <WelcomePage /> : <CounterPage />}</>;
}

export default App;
