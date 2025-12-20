// local
import { auth } from "./firebaseConfig";

// toast
import toast from "react-hot-toast";

// firebase
import { signOut } from "firebase/auth";

async function logoutWithFirebase() {
    try {
        await signOut(auth)

        toast.success("logout done successfully !", {id:"send-email"})
    } catch (err) {
        console.error(err.message)
    }
}

export default logoutWithFirebase;