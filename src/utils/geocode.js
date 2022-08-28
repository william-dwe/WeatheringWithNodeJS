const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=7418e551645617e6dbaf9064895fc27d&limit=1&query=' + encodeURIComponent(address);

    request({url, json: true}, (error, response) =>{
        if (error) {
            callback('Unable to connect with the Location API!', undefined);
        } else if (response.body.data.length === 0) {
            callback('Location not found!', undefined);
        } else {
            const {latitude, longitude, label} = response.body.data[0];
            callback(undefined, {
                latitude, 
                longitude,
                location:label
            });
        }
    })
}

module.exports = geocode;
