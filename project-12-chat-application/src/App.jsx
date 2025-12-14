// react router
import { Outlet } from "react-router";

// local
import SideBar from "./components/SideBar/SideBar"
import AppHeader from "./components/AppHeader/AppHeader";
import getAppUsers from "./fierbase-services/fireStore/getAllAppUsers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearAllAppUsers, clearContectedUsers, clearLoginUser, setAllAppUsers } from "./redux/usersSlice";
import { setLoginUser } from "./redux/usersSlice";
import { setAllContectedChats, setCurrentChatId, setCurrentChatMessages, setCurrentUserData, setIsThereIsChat } from "./redux/chatsSlice";
import getAllChats from "./fierbase-services/fireStore/getallChats";

// react
import { useEffect } from "react";

// redux
import { selectUser, setUser } from "./redux/authSlice";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fierbase-services/firebaseConfig";

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //  get all chats related to user
  useEffect(() => {
    async function getALlContectedChats() {
      const allContectedChats = await getAllChats(user?.uid);
      if (allContectedChats.length > 0) {
        dispatch(setAllContectedChats(allContectedChats))
      }
    }
    getALlContectedChats();
  }, [user, dispatch]);

  // get login user data
  useEffect(() => {
    async function getAllAppUsers() {
      const allAppUsers = await getAppUsers();
      if (allAppUsers.length > 0) {
        const allUsers = allAppUsers.filter((u) => u.uid !== user.uid)
        dispatch(setAllAppUsers(allUsers))
        dispatch(setLoginUser(allAppUsers.filter((u) => u.uid === user.uid)[0]))
      }
    }
    getAllAppUsers();
  }, [dispatch, user]);

  // clear data after logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(clearContectedUsers())
        dispatch(clearAllAppUsers())
        dispatch(clearLoginUser())
        dispatch(setAllContectedChats([]))
        dispatch(setCurrentChatId(null))
        dispatch(setCurrentChatMessages(null))
        dispatch(setIsThereIsChat(false))
        dispatch(setCurrentUserData(null))
        dispatch(setUser(null))
      } else {
        if (user) {
          const { uid, email, displayName } = user;
          dispatch(setUser({ uid, email, displayName }));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]); return (
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
