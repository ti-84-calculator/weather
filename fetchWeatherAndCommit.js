const axios = require('axios');
const fs = require('fs');

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Detroit", "El Paso", "Seattle", "Denver", "Washington", "Boston", "Memphis", "Nashville", "Portland", "Oklahoma City", "Las Vegas", "Baltimore", "Louisville", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City", "Long Beach", "Mesa", "Atlanta", "Colorado Springs", "Virginia Beach", "Raleigh", "Omaha", "Miami", "Oakland", "Minneapolis", "Tulsa", "Wichita", "New Orleans", "Arlington"];

async function fetchWeatherData() {
    const weatherData = [];

    for (const city of cities) {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true`);
        const weather = response.data.current_weather;
        weatherData.push({
            city: city,
            temperature: weather.temperature,
            windspeed: weather.windspeed,
        });
    }

    fs.writeFileSync('weatherData.json', JSON.stringify(weatherData, null, 2));  // Save data to weatherData.json
}

fetchWeatherData();
