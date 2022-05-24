const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

const viewsPath = path.join(__dirname, './templates/views')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath)

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My title',
    name: 'Andrew Mead'
  });
});

app.get('/weather_form', (req, res) => {
  res.render('weather');
})

app.get('/weather_forecast', (req, res) => {
  geocode(req.query.address, (error, data) => {
    if (error) {
      console.log('Error', error);
      res.send('Something goes wrong');
      return;
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        console.log('Error', error);
        res.send('Something goes wrong');
        return;
      }

      // let result = '<p>Address: ' + data.location + '</p>' + '<p>Forecast: ' + forecastData + '</p>';
      let result = {
        location: data.location,
        forecast: forecastData
      };
      res.send(result);
    })
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.'
  })
})

      app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})