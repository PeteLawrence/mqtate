'use strict';

const log4js = require('log4js');

class API {

  constructor(logger, mqtt) {
    this.logger = logger;
    this.mqtt = mqtt;
  }

}

module.exports = API;
