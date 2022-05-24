const request = require('request');
const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place&access_token=pk.eyJ1IjoiYXJ0aHVybWlrbyIsImEiOiJja3VkMHo3OWExNjRoMzJsOWI0aXNpazJyIn0.muI6ezsiliAXU8ZZOJIahw&limit=1`;

  request({
    url: geocodeURL,
    json: true
  }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (!response.body.features.length) {
      callback('Unable to find location. Try another search.');
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  });
}

module.exports = geocode;