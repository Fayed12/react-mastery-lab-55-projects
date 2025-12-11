import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function listenToChat(chatId, callback) {
    const chatRef = doc(db, "chats", chatId);

    const unsub = onSnapshot(chatRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.data());
        } else {
            callback(null);
        }
    });

    return unsub; 
}
