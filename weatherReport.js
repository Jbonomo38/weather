class WeatherReport {
    constructor(location, description, temp, feelslike, humidity, precipprob, uvindex) {
        this.location = location;
        this.description = description;
        this.temp = temp;
        this.feelslike = feelslike;
        this.precipprob = precipprob;
        this.uvindex = uvindex;
    }

    // formatLocation() {
    //     if(this.location.length) {
    //         const formattedLocation = "";
    //         formattedLocation += this.location.replace("[", "");
    //         formattedLocation = formattedLocation.replace("]", "");
    //         formattedLocation = formattedLocation.replace(" ", "");
    //     } else {
    //         return this.location;
    //     }
    // }
}

export { WeatherReport };