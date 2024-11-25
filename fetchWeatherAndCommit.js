const axios = require("axios");
const fs = require("fs");
const simpleGit = require("simple-git");

const git = simpleGit();

// List of cities
const cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka", "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos", "Kinshasa", "Manila", "Tianjin", "Guangzhou", "Rio de Janeiro", "Lahore", "Bangalore", "Shenzhen", "Moscow", "Chennai", "Bogotá", "Jakarta", "Lima", "Bangkok", "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Dhaka", "Mumbai", "Beijing", "Osaka"
    // Add your 1000 cities here
];

const weatherDataPath = './weatherData.json'; // Path where weather data will be saved

async function fetchWeatherData() {
    const weatherData = [];

    for (const city of cities) {
        try {
            console.log(`Fetching weather for ${city}...`);
            
            const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
            const geoData = geoResponse.data;
            
            if (geoData.results && geoData.results.length > 0) {
                const { latitude, longitude, name } = geoData.results[0];
                
                const weatherResponse = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                );
                
                const weather = weatherResponse.data.current_weather;
                weatherData.push({
                    city: name,
                    temperature: weather.temperature,
                    windspeed: weather.windspeed
                });
            }
        } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error.message);
        }
    }

    if (weatherData.length > 0) {
        try {
            // Save the fetched weather data to weatherData.json
            fs.writeFileSync(weatherDataPath, JSON.stringify(weatherData, null, 2));
            console.log("Weather data updated successfully.");
        } catch (error) {
            console.error("Error writing weather data to file:", error.message);
        }
    } else {
        console.log("No weather data fetched.");
    }
}

// Commit the weather data to the GitHub repository
async function commitChanges() {
    await fetchWeatherData();

    try {
        await git.add(weatherDataPath);
        await git.commit("Update weather data");
        await git.push('origin', 'main'); // Push to the main branch
        console.log("Weather data committed to GitHub.");
    } catch (error) {
        console.error("Error committing changes to GitHub:", error.message);
    }
}

commitChanges();
