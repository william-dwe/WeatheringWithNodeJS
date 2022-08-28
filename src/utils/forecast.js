const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3560b6ac320cda4cc19faf06e5b9e24a&query='+encodeURIComponent(lat)+','+encodeURIComponent(long);
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect with the Weather API!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const {weather_descriptions, temperature, feelslike} = response.body.current;
            callback(undefined, weather_descriptions[0] + ". It is currently " + temperature + " degrees out. But, it feels like " + feelslike + " degrees out.");
        }
    })
}

module.exports = forecast;