// base url 
const API_URL = "https://api.quotable.io/random";

async function fetchQuote() {
    try {
        const res = await fetch(API_URL)
        if (!res.ok) {
            throw new Error("something wend wrong in fetching data!")
        }
        const data =await res.json()
        return data
    } catch (err) {
        console.error(err.message)
    }
}

export default fetchQuote;