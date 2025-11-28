// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

// toast
import toast from "react-hot-toast";

async function updatePost(postId, updatedPost) {
    try {
        toast.loading("loading...", { id: "update-post" })
        setTimeout(async () => {
            const newRes = await axios.put(`${API_ROUTES.posts}/${postId}`, updatedPost)

            toast.success("Post updated successfully", { id: "update-post" })
            return newRes.data;
        }, 1000);
    } catch (error) {
        console.log(error)
        toast.error("Failed to update post", { id: "update-post" })
        return null;
    }
}

export default updatePost
