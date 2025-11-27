// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

// toast
import toast from "react-hot-toast";

async function addNewUser(newUser) {
    try {
        toast.loading("Adding user...", { id: "add-user" })
        const res = await axios.post(API_ROUTES.users, newUser)
        toast.success("User added successfully", { id: "add-user" })
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error("Failed to add user", { id: "add-user" })
        return null;
    }
}

export default addNewUser
