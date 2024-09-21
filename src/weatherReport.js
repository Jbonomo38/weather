class WeatherReport {
    constructor(location, description, temp, feelslike, humidity, precipprob, uvindex) {
        this.location = location;
        this.description = description;
        this.temp = temp;
        this.feelslike = feelslike;
        this.humidity = humidity;
        this.precipprob = precipprob;
        this.uvindex = uvindex;
    }

    getDetails() {
        return Object.entries(this);
    }

    getJson() {
        return JSON.stringify({
            location: this.location,
            description: this.description,
            temp: this.temp,
            feelslike: this.feelslike,
            humidity: this.humidity,
            precipprob: this.precipprob,
            uvindex: this.uvindex
        });
    }
}

export { WeatherReport };