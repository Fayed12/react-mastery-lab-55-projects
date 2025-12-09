import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const updateUserField = async (userId, data) => {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, data);
};

export default updateUserField;
