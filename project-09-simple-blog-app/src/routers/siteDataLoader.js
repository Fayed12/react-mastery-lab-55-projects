// local
import { API_ROUTES } from "/config.js";

// axios
import axios from "axios";

async function siteDataLoader() {
    try {
        const response = await axios.get(API_ROUTES.site);
        const siteData = response.data;

        return siteData;
    } catch (error) {
        console.error("Error fetching site data:", error);
        return null;
    }
}

export default siteDataLoader;