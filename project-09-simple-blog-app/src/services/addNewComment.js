// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

// toast
import toast from "react-hot-toast";

async function addNewComment(postId, newComment) {
    try {
        toast.loading("loading...", { id: "add-comment" })
        setTimeout(async () => {
            const res = await axios.get(`${API_ROUTES.posts}/${postId}`)

            const newCommentsArray = [...res.data.comments, newComment]

            const newRes = await axios.put(`${API_ROUTES.posts}/${postId}`, {
                ...res.data,
                comments: newCommentsArray
            })

            toast.success("Comment added successfully", { id: "add-comment" })
            return newRes.data;
        }, 1000);
    } catch (error) {
        console.log(error)
        toast.error("Failed to add comment", { id: "add-comment" })
        return null;
    }
}

export default addNewComment