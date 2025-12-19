// local
import Login from "./pages/auth/login/login";
import { UserContext } from "./context/context";

// react
import { useEffect, useContext } from "react";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase/firebaseConfig";

function App() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  console.log(userDetails)

  // listen to login user 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          email: user.email,
          uid:user.uid
        } 
        setUserDetails(userInfo)
      } else {
        setUserDetails(null)
      }
    })

    return () => unsubscribe();
  },[])
  return (
      <>
          <Login />
      </>
  );
}

export default App
