import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const getAllUsers = async (userId) => {
    try {
        let usersData = [];
        // get the logged in user's document
        const usersRef = doc(db, "users", userId);
        const snapshot = await getDoc(usersRef);

        if (!snapshot.exists()) return usersData;

        const contactedUserIds = snapshot.data().contactedUsers || [];

        // fetch all contacted users in parallel
        usersData = await Promise.all(
            contactedUserIds.map(async (uid) => {
                const ref = doc(db, "users", uid);
                const snap = await getDoc(ref);
                return snap.exists() ? snap.data() : null;
            })
        );

        // remove nulls if any
        usersData = usersData.filter(u => u !== null);

        return usersData;
    } catch (error) {
        console.error("Error fetching contacted users:", error);
        return ([])
    }
};

export default getAllUsers;
