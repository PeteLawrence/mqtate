'use strict';

var speedTest = require('speedtest-net');


class SpeedTestNet {

  constructor(api, config) {
    this.api = api;
  }

  start() {
    this.update();

    //Schedule weather to be updated periodically
    setInterval(this.update.bind(this), this.config.refreshInterval * 1000);
  }

  update() {
    this.api.logger.info('Starting speed test');

    //Start the test
    var test = speedTest({maxTime: 5000});

    //Ping
    test.on('testserver', function(server) {
      console.log(server);
      this.api.logger.debug('Using ' + server.sponsor + ' - ' + server.bestPing.toFixed(2) + 'ms');
    }.bind(this));

    //Download speed
    test.on('data', function(result) {
      console.log(result);
      this.api.mqtt.publish('speedtest/download', result.speeds.download + '');
      this.api.mqtt.publish('speedtest/upload', result.speeds.upload + '');
      this.api.mqtt.publish('speedtest/ping', result.server.ping.toFixed(2) + '');
    }.bind(this));

    //Error
    test.on('error', function(error) {
      console.trace(error);
    });

  }

}

module.exports = SpeedTestNet;
