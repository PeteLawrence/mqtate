'use strict';

const mqtt = require('mqtt');
const EventEmitter = require('events');

class MQTT extends EventEmitter {

  constructor(logger) {
    super();
    this.logger = logger;
  }

  connect(url, options) {
    return new Promise(function(resolve, reject) {
      this.client = mqtt.connect(url, options);
      this.client.on('connect', () => {
        resolve();
      });
    }.bind(this));
  }

  publish(topic, payload, options) {
    return new Promise(function(resolve, reject) {
      options = options || {};
      this.logger.debug('publish()', topic, payload);

      this.client.publish(topic, payload, options, function() {
        resolve();
      });
    }.bind(this));
  }
}

module.exports = MQTT;
