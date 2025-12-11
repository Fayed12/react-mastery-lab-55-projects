import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"

export const sendMessage = async (chatId, senderId, text) => {
    const messagesRef = collection(db, "chats", chatId, "chatMessages");

    await addDoc(messagesRef, {
        senderId,
        text,
        time: new Date().toISOString(),
    });

    const chatRef = doc(db, "chats", chatId);

    await updateDoc(chatRef, {
        lastMessage: text,
        time: new Date().toISOString(),
        senderId,
        seenStatus: true,
    });
};
