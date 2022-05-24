console.log('script from public app.js');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch('/weather_forecast?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data.location)
        console.log(data.forecast)

        const pLocation = document.querySelector('#location');
        const pForecast = document.querySelector('#forecast');
        pLocation.textContent = 'Location: ' + data.location;
        pForecast.textContent = 'Forecast: ' + data.forecast;
      }
    })
  });
});