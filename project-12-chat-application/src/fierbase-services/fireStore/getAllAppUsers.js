import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const getAppUsers = async () => {
    try {
        let appUsers = [];
        // get the logged in user's document
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        appUsers = snapshot.docs.map((doc) => doc.data());

        return appUsers;
    } catch (error) {
        console.error("Error fetching app users:", error);
        return ([])
    }
};

export default getAppUsers;
