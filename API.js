function API(logger, mqtt) {
  this.logger = logger;
  this.mqtt = mqtt;
}

API.prototype.publish = function(topic, payload, options) {
  options = options || {};

  this.logger.debug('publish()', topic, payload, options);
}

module.exports = API;
