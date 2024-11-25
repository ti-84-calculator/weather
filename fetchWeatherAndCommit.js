const axios = require('axios');
const fs = require('fs');
const simpleGit = require('simple-git');

const git = simpleGit();
console.log("Starting the weather data fetch script...");

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Detroit", "El Paso", "Seattle", "Denver", "Washington", "Boston", "Memphis", "Nashville", "Portland", "Oklahoma City", "Las Vegas", "Baltimore", "Louisville", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City", "Long Beach", "Mesa", "Atlanta", "Colorado Springs", "Virginia Beach", "Raleigh", "Omaha", "Miami", "Oakland", "Minneapolis", "Tulsa", "Wichita", "New Orleans", "Arlington"];

const appJsPath = './app.js'; // Path to the JavaScript file to write

async function fetchWeatherData() {
    console.log("Fetching weather data...");
    const weatherData = [];
    for (const city of cities) {
        try {
            console.log(`Fetching weather for ${city}...`);
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
            console.log(`Response for ${city}:`, response.data);
            weatherData.push({
                city: city,
                temperature: 25, // Replace with actual temperature from API
                windspeed: 10 // Replace with actual windspeed from API
            });
        } catch (error) {
            console.error(`Error fetching data for ${city}:`, error.message);
        }
    }

    if (weatherData.length > 0) {
        console.log("Writing weather data to app.js...");

        const weatherDataJs = `
const weatherData = ${JSON.stringify(weatherData, null, 2)};
`;

        // Read the existing app.js file, prepend the data, and save
        const existingContent = fs.readFileSync(appJsPath, 'utf8');
        const updatedContent = weatherDataJs + existingContent; // Prepend the weather data

        fs.writeFileSync(appJsPath, updatedContent);
    } else {
        console.log("No weather data fetched.");
    }
}

async function commitChanges() {
    await fetchWeatherData();

    console.log("Adding changes to Git...");
    await git.add(appJsPath);

    console.log("Committing changes...");
    await git.commit("Update app.js with new weather data");

    console.log("Pushing changes to GitHub...");
    await git.push('origin', 'main');
    console.log("Changes pushed successfully.");
}

commitChanges().catch((error) => {
    console.error("Error in script execution:", error.message);
});
