// local
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// toast
import toast from "react-hot-toast";

// firebase

async function deleteItem(collectionName, id) {
    try {
        const ref = doc(db, collectionName,id)

        await deleteDoc(ref)

        toast.success(`deleted successfully`, { id: "new-data" })
    } catch (error) {
        toast.error("something went wrong!", { id: "new-data" })
        console.error("createDocument error:", error);
        throw error;
    }
}

export default deleteItem 