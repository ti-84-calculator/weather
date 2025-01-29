document.getElementById("getWeatherButton").addEventListener("click", getWeather);

function getWeather() {
    const location = document.getElementById("location").value.trim().toLowerCase();
    
    // Ensure weatherData exists (it should be injected by GitHub Action)
    if (!Array.isArray(weatherData)) {
        document.getElementById("result").innerHTML = `<p style="color: red;">Weather data is unavailable.</p>`;
        return;
    }

    const cityWeather = weatherData.find(city => city.city.toLowerCase() === location);

    if (!cityWeather) {
        document.getElementById("result").innerHTML = `<p style="color: red;">City not found in weather data. Message the owner to suggest your city!</p>`;
        return;
    }

    displayWeather(cityWeather.city, cityWeather.temperature, "°C", cityWeather.windspeed);
}

function displayWeather(city, temperature, unit, windspeed) {
    document.getElementById("result").innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature} ${unit}</p>
        <p>Windspeed: ${windspeed} km/h</p>
    `;
}
