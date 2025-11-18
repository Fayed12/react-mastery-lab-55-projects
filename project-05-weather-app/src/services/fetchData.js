async function fetchData(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49f36df5e17f0cd0c0a96fdcefa40e93&units=metric`)
        if (!res.ok) {
            throw new Error("something went wrong in fetching data!");
        }
        const data = await res.json()
        return data
    } catch (err){
        console.error(err)
    }
}

export default fetchData;