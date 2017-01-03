'use strict';

var request = require('request');


class IPAddress {

  constructor(api, config) {
    this.api = api;
    this.config = config;
  }

  start() {
    this.update();

    //Schedule IP address to be updated periodically
    setInterval(this.update.bind(this), this.config.refreshInterval * 1000);
  }

  update() {
    request('https://icanhazip.com', function(err, response, body) {
      if (!err && response.statusCode == 200) {
        this.api.mqtt.publish('ipaddress', body);
      } else {
        this.api.logger.error('Unable to get IP address');
      }
    }.bind(this));

  }

}

module.exports = IPAddress;
