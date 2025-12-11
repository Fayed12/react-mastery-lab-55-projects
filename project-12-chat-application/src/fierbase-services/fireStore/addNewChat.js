import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import toast from "react-hot-toast";

function generateChatId(uid1, uid2) {
    return uid1 > uid2 ? `${uid1}-${uid2}` : `${uid2}-${uid1}`;
}

export async function createNewChat(user1, user2) {
    const chatId = generateChatId(user1, user2);

    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);
    
    if (chatSnap.exists()) {
        toast.error("Chat already exists", { id: "error" });
        throw new Error("Chat already exists");
    }

    // create empty chat
    await setDoc(chatRef, {
        members: [user1, user2],
        seenStatus: false,
        senderId:"",
        lastMessage: "",
        time: "",
    });

    // create messages collection
    const messagesRef = collection(db, "chats", chatId, "chatMessages");

    // create first message
    await addDoc(messagesRef, {
        system: true,
        text: "",
        time:"",
    });

    return chatId;
}
