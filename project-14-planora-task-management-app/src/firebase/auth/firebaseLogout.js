// local
import { auth } from "../firebaseConfig";

// firebase
import { signOut } from "firebase/auth";

// toast
import toast from "react-hot-toast";

async function logoutWithFirebase() {
    try {
        await signOut(auth)
        toast.success("logout done successfully", {id:"logout"})
    } catch (err) {
        console.error(err.message)
    }
}

export default logoutWithFirebase