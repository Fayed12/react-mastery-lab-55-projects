import {db} from "../firebaseConfig";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const getMessages = (chatId, callback) => {
    const messagesRef = collection(db, "chats", chatId, "chatMessages");

    const q = query(messagesRef, orderBy("time", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        callback(messages);
    });

    return unsubscribe;
};

export default getMessages;
