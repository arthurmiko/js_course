const request = require('request');
const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b0769f7ccbb7f7d870e8555cb4c982da&query=${long},${lat}&units=m`;

  request({
    url: url,
    json: true
  }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (response.body.error) {
      callback('Unable to find location');
    } else {
      callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently  ${response.body.current.temperature}. It feels like ${response.body.current.feelslike}`);
    }
  });
}

module.exports = forecast;