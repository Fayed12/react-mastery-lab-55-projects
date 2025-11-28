// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

async function getUserDetails(userId) {
    try {
        const res = await axios.get(`${API_ROUTES.users}/${userId}`)
        const userData = res.data;

        return userData;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default getUserDetails
