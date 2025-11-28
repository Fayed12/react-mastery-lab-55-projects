// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

// toast
import toast from "react-hot-toast";

async function deletePost(postId) {
    try {
        toast.loading("loading...", { id: "delete-post" })
        setTimeout(async () => {
            const res = await axios.delete(`${API_ROUTES.posts}/${postId}`)

            toast.success("Post deleted successfully", { id: "delete-post" })
            return res.data;
        }, 1000);
    } catch (error) {
        console.log(error)
        toast.error("Failed to delete post", { id: "delete-post" })
        return null;
    }
}

export default deletePost