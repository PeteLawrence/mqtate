const MQTT = require('./MQTT.js');
const config = require('./config.json');
const Logger = require('./Logger.js');

//Create a logger
var logger = new Logger('CORE');

logger.info('Started mqtt-controller');


//Connect to the MQTT broker
var mqtt = new MQTT(logger);

mqtt.connect(config.broker.url).then(function() {
  logger.info('Connected to MQTT broker');

  //Create the API object that plugins will be passed
  var API = require('./API.js');

  config.plugins.forEach(function(pluginConfig) {
    var pluginLogger = new Logger(pluginConfig.name);
    var api = new API(pluginLogger, mqtt);

    //TODO: Instantiate the plugin

    api.mqtt.publish('foo', 'bar').then(function() {
      pluginLogger.debug('Published message');
    });
  });

});
