import { useState, useEffect } from "react";

function WeatherApp() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            const res = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=3.139&longitude=101.6869&current_weather=true"
            );

            const data = await res.json();

            setWeather(data.current_weather);
        }

        fetchWeather();
    }, []);

    if (!weather) return <p>Loading weather...</p>;

    return (
        <div>
            <h2>Current Weather</h2>

            <p>Temperature: {weather.temperature}</p>

            <p>Windspeed: {weather.windspeed}</p>
        </div>
    );
}

export default WeatherApp;