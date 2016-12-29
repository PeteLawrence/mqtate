'use strict';

const log4js = require('log4js');

class Logger {

  constructor(prefix) {
    this.logger = log4js.getLogger(prefix);
  }

  log(level, message) {
    this.logger.log(level, message);
  }

  trace(message) {
    this.log('trace', message);
  }

  debug(message) {
    this.log('debug', message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }

  fatal(message) {
    this.log('fatal', message);
  }

}

module.exports = Logger;
