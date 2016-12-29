'use strict';

const mqtt = require('mqtt');

class MQTT {

  constructor(logger, url) {
    var client = mqtt.connect(url);
    client
      .on('connect', function () {
        logger.info('Connected to MQTT broker');
      })
      .on('error', function(err) {
        logger.error(err);
      });
  }
}

module.exports = MQTT;
