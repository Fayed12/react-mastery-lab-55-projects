// local
import { db } from "../firebaseConfig";

import { query, collection, where, getDocs } from "firebase/firestore";

const getAllChats = async (userId) => {
    const q = query(
        collection(db, "chats"),
        where("members", "array-contains", userId)
    );

    const snapshot = await getDocs(q);

    const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return chats;
};

export default getAllChats;