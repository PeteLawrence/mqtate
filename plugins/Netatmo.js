'use strict';

var netatmo = require('netatmo');

class Netatmo {

  constructor(api, config) {
    this.api = api;
    this.config = config;

    this.netatmoApi = new netatmo({
      "client_id": config.client_id,
      "client_secret": config.client_secret,
      "username": config.username,
      "password": config.password
    });


  }

  start() {
    this.update();

    //Schedule weather to be updated periodically
    setInterval(this.update.bind(this), this.config.refreshInterval * 1000);
  }


  update() {
    this.netatmoApi.getStationsData(function(err, devices) {
      devices.forEach(function(stationData) {
        this.processStationData(stationData);
      }.bind(this))
    }.bind(this));
  }


  processStationData(stationData) {
    this.api.logger.info(stationData);
    switch(stationData.type) {
      case 'NAMain':
        this.processMainStationData(stationData);
    }
  }


  processMainStationData(stationData) {
    //Process this modules data
    this.api.logger.info('AbsolutePressure', stationData.dashboard_data.AbsolutePressure);
    this.api.logger.info('Noise', stationData.dashboard_data.Noise);
    this.api.logger.info('Temperature', stationData.dashboard_data.Temperature);
    this.api.logger.info('TemperatureTrend', stationData.dashboard_data.temp_trend);
    this.api.logger.info('Humidity', stationData.dashboard_data.Humidity);
    this.api.logger.info('Pressure', stationData.dashboard_data.Pressure);
    this.api.logger.info('PressureTrend', stationData.dashboard_data.pressure_trend);
    this.api.logger.info('CO2', stationData.dashboard_data.CO2);
    this.publishMeasure('Indoor', 'Temperature', stationData.dashboard_data.Temperature.toString());

    //Process sub-modules data
    stationData.modules.forEach(function(moduleData) {
      switch(moduleData.type) {
        case 'NAModule1': {
          //Outdoor Module
          this.processOutdoorModuleData(moduleData);
          break;
        }
        case 'NAModule3': {
          //Rain Module
          this.processRainModuleData(moduleData);
          break;
        }
      }
    }.bind(this));
  }

  processOutdoorModuleData(moduleData) {
    this.api.logger.debug(moduleData);
    this.api.logger.info('Temperature', moduleData.dashboard_data.Temperature);
    this.api.logger.info('TemperatureTrend', moduleData.dashboard_data.temp_trend);
    this.api.logger.info('Humidity', moduleData.dashboard_data.Humidity);
  }

  processRainModuleData(moduleData) {
    this.api.logger.debug(moduleData);
    this.api.logger.info('Rain', moduleData.dashboard_data.Rain);
    this.api.logger.info('Rain1Hour', moduleData.dashboard_data.sum_rain_1);
    this.api.logger.info('Rain24Hour', moduleData.dashboard_data.sum_rain_24);
  }

  publishMeasure(device, measureName, measureValue) {
    var topic = device + '/' + measureName;
    this.api.mqtt.publish(topic, measureValue);
  }

}

module.exports = Netatmo;
