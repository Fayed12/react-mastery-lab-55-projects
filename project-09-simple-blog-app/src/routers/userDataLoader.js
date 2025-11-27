// axios
import axios from "axios";

// local
import { API_ROUTES } from "/config.js";

async function userDataLoader() {
    try {
        const response = await axios.get(API_ROUTES.users);
        const userData = response.data;

        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default userDataLoader;