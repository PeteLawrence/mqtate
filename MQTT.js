'use strict';

const mqtt = require('mqtt');
const EventEmitter = require('events');

class MQTT extends EventEmitter {

  constructor(logger) {
    super();
    this.logger = logger;
  }

  connect(url) {
    return new Promise(function(resolve, reject) {
      this.client = mqtt.connect(url);
      this.client.on('connect', () => {
        resolve();
      });
    }.bind(this));
  }

  publish(topic, payload, options) {
    return new Promise(function(resolve, reject) {
      options = options || {};
      console.log('payload', payload);

      this.client.publish(topic, payload, options, function() {
        resolve();
      });
    }.bind(this));
  }
}

module.exports = MQTT;
