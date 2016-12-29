const log4js = require('log4js');

function Logger(prefix) {
  this.logger = log4js.getLogger(prefix);
}

Logger.prototype.info = function(message) {
  this.logger.info(message);
}


module.exports = Logger;
