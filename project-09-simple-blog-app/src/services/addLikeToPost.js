// axios
import axios from "axios";

// local
import { API_ROUTES } from "../../config.js";

// toast
import toast from "react-hot-toast";

async function addRemoveLikeFromPost(postId, userId, action) {
    try {
        toast.loading("loading...", { id: "add-like" })
        setTimeout(async () => {
            const res = await axios.get(`${API_ROUTES.posts}/${postId}`)

            const newLikesArray = action ? [...res.data.likes, userId] : res.data.likes.filter((id) => id !== userId)

            const newRes = await axios.put(`${API_ROUTES.posts}/${postId}`, {
                ...res.data,
                likes: newLikesArray
            })

            action ? toast.success("Like added", { id: "add-like" }) : toast.success("Like removed", { id: "add-like" })
            return newRes.data;
        }, 1000);
    } catch (error) {
        console.log(error)
        toast.error("Failed to add like", { id: "add-like" })
        return null;
    }
}

export default addRemoveLikeFromPost
