// react
import { useEffect, useState } from "react";

// local
import fetchData from "./services/fetchData";

// react icons
import { MdOutlineWindPower } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

// wind icons object
const weatherIcons = {
    Clear: "/icons/clear.png",
    Clouds: "/icons/cloud.png",
    Drizzle: "/icons/drizzle.png",
    Dust: "/icons/dust.png",
    Fog: "/icons/fog.png",
    Haze: "/icons/haze.png",
    Mist: "/icons/mist.png",
    Rain: "/icons/Rain.png",
    Sand: "/icons/sand.png",
    Smoke: "/icons/smoke.png",
    Snow: "/icons/snow.png",
    Squall: "/icons/Squall.png",
    Thunderstorm: "/icons/thunderstorms.png",
    Tornado: "/icons/tornado.png",
};

function App() {
    const [city, setCity] = useState("");
    const [query, setQuery] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setdate] = useState("");

    /*===========================================================================================
                                  handle submit city name
  ===========================================================================================*/
    function handleSearch(e) {
        e.preventDefault();
        if (query) {
            setCity(query);
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            setdate(`${hours}:${minutes}`);
        } else {
            alert("try typing city name");
        }
    }

    /*===========================================================================================
                                  handle fetch weather data after typing city name
  ===========================================================================================*/
    useEffect(() => {
        if (city) {
            async function fetchWeather() {
                setLoading(true);
                const data = await fetchData(city);
                setLoading(false);
                setWeatherData(data);
                setQuery("");
                setCity("");
            }
            fetchWeather();
        }
    }, [city]);

    return (
        <div className="app">
            <div className="overlay"></div>
            <form className="searchBox" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {weatherData ? (
                <div className="card">
                    {!loading ? (
                        <div className="card-content">
                            <div className="row top">
                                <p className="cityName">
                                    {weatherData?.name}
                                    <span className="country">
                                        {weatherData?.sys.country}
                                    </span>
                                </p>
                                <p className="time">
                                    {date}
                                    {Number(date.split(":").at(0)) > 11
                                        ? "PM"
                                        : "AM"}
                                </p>
                            </div>

                            <div className="body">
                                <h1 className="temp">
                                    {weatherData?.main.temp}°C
                                </h1>
                                <p className="desc">
                                    {weatherData?.weather.at(0).main}
                                </p>
                            </div>

                            <div className="footer">
                                <div className="bottom">
                                    <p title="wind speed">
                                        <span>
                                            <MdOutlineWindPower />
                                        </span>
                                        {(
                                            weatherData?.wind.speed * 3.6
                                        ).toFixed(2)}
                                        Km/h
                                    </p>
                                    <p title="clouds">
                                        <span>
                                            <TiWeatherWindyCloudy />
                                        </span>
                                        {weatherData?.clouds.all}%
                                    </p>
                                    <p title="humidity">
                                        <span>
                                            <WiHumidity />
                                        </span>
                                        {weatherData?.main.humidity}%
                                    </p>
                                </div>

                                <img
                                    className="weatherIcon"
                                    src={
                                        weatherIcons[
                                            weatherData?.weather.at(0).main
                                        ]
                                    }
                                    title={weatherData?.weather.at(0).main}
                                    alt="icon"
                                />
                            </div>
                        </div>
                    ) : (
                        <p className="loading">loading.....</p>
                    )}
                </div>
            ) : (
                <div className="empty">
                    <p>Start by searching for your city's weather.</p>
                </div>
            )}
        </div>
    );
}

export default App;
