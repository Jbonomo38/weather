import { WeatherReport }  from './weatherReport.js';

const myAPIKey = `NJNHFJWEWXBUH2AP8G65CY3JX`;
const weatherLocation = document.querySelector("location")
const weatherButton = document.querySelector("button");

async function loadScreen() {
    try {
        if(navigator.geolocation) {
            const location = navigator.geolocation.getCurrentPosition();
            const lat = location.coords.latitude;
            const long = location.coords.longitude;
            weatherReportFunc([lat, long]);
        } else {
            weatherReportFunc("New York");
        }
    } catch (error) {
        console.log(error);
    }
}

async function weatherReportFunc(location) {
    updateWeather(requestWeather(location));
}

async function requestWeather(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formatLocation(location)}?key=${myAPIKey}`,
            {
                mode: "cors"
            }
        );
        const responseJson = await response.json();

        const weather = new WeatherReport(
            responseJSON.Address,
            responseJSON.description,
            responseJSON.days[0].temp,
            responsejSON.days[0].feelslike,
            responsejSON.days[0].humidity,
            responsejSON.days[0].precipprob,
            responsejSON.days[0].uvindex,
        );

        console.log(weather);
        return weather;
    } catch (e) {
        console.log(e);
    }
}

async function updateWeather(weatherReport) {
    try {

    } catch (e) {
        console.log(e);
    }
}

function formatLocation(location) {
    if(location.length) {
        const formattedLocation = "";
        formattedLocation += location.replace("[", "");
        formattedLocation = formattedLocation.replace("]", "");
        formattedLocation = formattedLocation.replace(" ", "");
    } else {
        return location;
    }
}

loadScreen();
weatherButton.addEventListener("click", async function(e) {
   e.preventDefault();
   weatherReport(weatherLocation.value);
});