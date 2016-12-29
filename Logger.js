'use strict';

const log4js = require('log4js');

class Logger {

  constructor(prefix) {
    this.logger = log4js.getLogger(prefix);
  }

  log() {
    var args = Array.from(arguments);
    this.logger.log.apply(this.logger, args);
  }

}


// Add in helper methods to allow developers to call logger.<info/error/etc>(message)
['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach(addLevelMethods);
function addLevelMethods(level) {
  Logger.prototype[level] = function() {
    var args = Array.from(arguments);
    args.unshift(level);
    this.log.apply(this, args);
  }
}

module.exports = Logger;
