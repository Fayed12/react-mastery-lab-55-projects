// react router data loader

import { API_ROUTES } from "/config.js";

async function siteDataLoader() {
    try {
        const response = await fetch(API_ROUTES.site);
        if (!response.ok) {
            throw new Error("Failed to fetch site data");
        }
        const siteData = response.json();

        return siteData;
    } catch (error) {
        console.error("Error fetching site data:", error);
        return null;
    }
}

export default siteDataLoader;