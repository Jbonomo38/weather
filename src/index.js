import { WeatherReport }  from './weatherReport.js';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const myAPIKey = `NJNHFJWEWXBUH2AP8G65CY3JX`;
    const weatherLocation = document.querySelector("#location-search");
    const weatherButton = document.querySelector("button");
    const img = document.querySelector("img");

    async function loadScreen() {
        try {
            // if(navigator.geolocation) {
            //     const location = await new Promise ((resolve, reject)  => {
            //         navigator.geolocation.getCurrentPosition(resolve, reject);
            //     });
            //     console.log(location);
            //     const lat = location.coords.latitude;
            //     console.log(lat);
            //     const long = location.coords.longitude;
            //     console.log(long);
            //     const weather = await requestWeather([lat, long]);
            //     await updateWeather(weather);
            // } else {
            //     const weather = await requestWeather("New York");
            //     await weatherReportFunc("New York");
            // }
            const weather = await requestWeather("New York");
            console.log(weather);
            await updateWeather(weather);
            requestGif(weather.location, weather.description)
        } catch (error) {
            console.log(error);
        }
    }
    
    // Fetches weather data from API and returns weatherReport object
    async function requestWeather(location) {
        try {
            console.log(formatLocation(location.toString()));
            const encodedLocation = encodeURIComponent(location.toString());
            console.log(`Requesting weather for: ${encodedLocation}`)
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?key=${myAPIKey}`,
                {
                    mode: "cors"
                }
            );
            const responseJson = await response.json();
            console.log(responseJson.address);
    
            const weather = new WeatherReport(
                responseJson.resolvedAddress || responseJson.Address,
                responseJson.description,
                responseJson.days[0].temp,
                responseJson.days[0].feelslike,
                responseJson.days[0].humidity,
                responseJson.days[0].precipprob,
                responseJson.days[0].uvindex,
            );
    
            console.log(weather);
            console.log(`WeatherReport Instance?: ${weather instanceof WeatherReport}`);
            return weather;
        } catch (e) {
            console.log(e);
        }
    }
    
    // Updates weather details on webpage from passed through weatherReport object
    async function updateWeather(weatherReport) {
        console.log(weatherReport instanceof WeatherReport);
        try {
            const weatherReportDetails = weatherReport.getDetails();
            weatherReportDetails.forEach(([key, value]) => {
                const component = document.querySelector(`#${key}`);
                if(component) {
                    component.textContent = value;
                    console.log(component, value)
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    function formatLocation(location) {
        if(location.length) {
            let formattedLocation = "";
            formattedLocation += location.replace("[", "");
            formattedLocation = formattedLocation.replace("]", "");
            formattedLocation = formattedLocation.replace(" ", "");
            return formattedLocation;
        } else {
            return location;
        }
    }

    async function requestGif(location, description) {
        try {
            const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=jlmR09epOmI6MH0WkKkItvTTOpiug8Rx&s=${location+" "+description}`,
            {
              mode: "cors",
            }
            );
            const responseJson = await response.json();
            img.src = responseJson.data.images.original.url;
        } catch(e) {
            console.log(e);
        }
    }
    
    loadScreen();
    weatherButton.addEventListener("click", async function(e) {
       e.preventDefault();
       const loc = weatherLocation.value;
       weatherLocation.value = "";
       const weatherObject = await requestWeather(loc);
       updateWeather(weatherObject);
        requestGif(weatherObject.location, weatherObject.description);
    });
});


