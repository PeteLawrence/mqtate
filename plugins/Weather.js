'use strict';

const request = require('request');

class Weather {

  constructor(api, config) {
    this.api = api;

    //Build an array of MAC addresses of Dash buttons to listen for
    var longitude = config.longitude;
    var latitude = config.latitude;

    //Update weather on startup
    this.update(longitude, latitude);

    //Schedule weather to be updated periodically
    setInterval(this.update.bind(this), config.refreshInterval * 1000, longitude, latitude);
  }

  update(longitude, latitude) {
    var forecastPromise = this.getForecast(longitude, latitude);
    forecastPromise
      .then(function(forecast) {
        this.api.logger.info('Updated weather to ' + forecast.currently.summary);
        this.api.mqtt.publish('weather/summary', forecast.currently.summary, { retain: true });
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  }

  getForecast(longitude, latitude) {
    return new Promise(function(resolve, reject) {
      var key = '41fd41f2fb6ac5f3e84b779afe78c2ff';
      var url = 'https://api.darksky.net/forecast/' + key + '/' + longitude + ',' + latitude + '?units=si';
      request(url, function (error, response, body) {
        if (error) {
          //console.trace(error);
          reject('Error');
        }

        var forecast = JSON.parse(body);

        resolve(forecast);
      });
    });
  }

}

module.exports = Weather;
