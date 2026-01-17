// local
import { db } from "./firebaseConfig"

// toast
import toast from "react-hot-toast"

// firebase
import { addDoc, collection } from "firebase/firestore"

async function createDocument(collectionName, newData) {
    if (!collectionName || typeof collectionName !== "string") {
        throw new Error("Invalid collection name");
    }

    try {
        const ref = collection(db, collectionName)

        const res = await addDoc(ref, newData)

        toast.success("Created successfully", { id: "new-data" });

        return res
    } catch (err) {
        toast.error("something went wrong!", { id: "new-data" })
        console.error("createDocument error:", err);
        throw err;
    }
}

export default createDocument;