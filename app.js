// Replace this URL with the actual GitHub Pages URL where your weatherData.json is hosted
const weatherDataURL = "https://ti-84-calculator.github.io/weather/weatherData.json"; 

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("getWeatherButton");
    button.addEventListener("click", getWeather);
});

async function getWeather() {
    const location = document.getElementById("location").value.trim().toLowerCase();
    try {
        const response = await fetch(weatherDataURL);
        const data = await response.json();

        // Search for the city in the weather data
        const cityWeather = data.find(city => city.city.toLowerCase() === location);

        if (!cityWeather) {
            throw new Error("City not found in weather data. Message the owner to suggest your city!");
        }

        displayWeather(cityWeather.city, cityWeather.temperature, "°C", cityWeather.windspeed);
    } catch (error) {
        document.getElementById("result").innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function displayWeather(city, temperature, unit, windspeed) {
    document.getElementById("result").innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature} ${unit}</p>
        <p>Windspeed: ${windspeed} km/h</p>
    `;
}
