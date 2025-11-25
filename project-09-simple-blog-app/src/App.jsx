// react router
import { RouterProvider } from "react-router";

// local router
import router from "./routers/mainRouter";

function App() {

  return (
    <>  
      <RouterProvider router={router} />
    </>
  )
}

export default App
