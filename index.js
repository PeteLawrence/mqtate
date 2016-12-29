const MQTT = require('./MQTT.js');
const config = require('./config.json');
const Logger = require('./Logger.js');

//Create a logger
var logger = new Logger('CORE');

logger.info('Started mqtt-controller');


//Connect to the MQTT broker
var mqtt = new MQTT(logger, config.broker.url);


//Create the API object that plugins will be passed
var API = require('./API.js');
var pluginLogger = new Logger('Plugin1');
var api = new API(pluginLogger, mqtt);

api.publish('foo', 'bar');
