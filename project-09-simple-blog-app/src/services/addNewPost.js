// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

// toast
import toast from "react-hot-toast";

async function addNewPost(post) {
    try {
        toast.loading("loading...", { id: "add-comment" })
        setTimeout(async () => {
            const newRes = await axios.post(`${API_ROUTES.posts}`, post)
            toast.success("Post added successfully", { id: "add-comment" })
            return newRes.data;
        }, 1000);
    } catch (error) {
        console.log(error)
        toast.error("Failed to add post", { id: "add-comment" })
        return null;
    }
}

export default addNewPost