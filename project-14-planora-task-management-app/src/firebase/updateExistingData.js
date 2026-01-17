// local
import toast from "react-hot-toast";
import { db } from "./firebaseConfig";

import { doc, updateDoc } from "firebase/firestore";

async function updateData(collectionName, id, UpdatedData) {
    // updatedData is object

    try {
        const ref = doc(db, collectionName, id)

        const res = await updateDoc(ref, UpdatedData)

        return res
    } catch (error) {
        toast.error("something went wrong!", { id: "new-data" })
        console.error("createDocument error:", error);
        throw error;
    }
}

export default updateData