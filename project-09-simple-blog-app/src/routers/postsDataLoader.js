// local
import { API_ROUTES } from "/config.js";

// axios
import axios from "axios";

const postsDataLoader = async({params}) => {
    const { id } = params || {};
    try {
        if (!id) {
            const response = await axios.get(`${API_ROUTES.posts}`);
            return response.data;
        } else {
            const response = await axios.get(`${API_ROUTES.posts}?id=${(id)}`);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default postsDataLoader;