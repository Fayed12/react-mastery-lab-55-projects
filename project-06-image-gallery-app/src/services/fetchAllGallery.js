// axios
import axios from "axios"

async function fetchAllData(query, pageNumber) {
    try {
        const res = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=${pageNumber}&per_page=20&client_id=p4WUHez9nyI3I1lPg8WbZOS2x85gc15dhwBq5NfmdHE`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export default fetchAllData;