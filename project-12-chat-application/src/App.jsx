// react router
import { Outlet } from "react-router";

// local
import SideBar from "./components/SideBar/SideBar"
import AppHeader from "./components/AppHeader/AppHeader";

function App() {
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
