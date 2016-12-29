const mqtt = require('mqtt');
const config = require('./config.json');
const Logger = require('./Logger.js');

//Create a logger
var logger = new Logger('CORE');

logger.info('Started mqtt-controller');


//Connect to the MQTT broker
var client  = mqtt.connect(config.broker.url);
client
  .on('connect', function () {
    logger.info('Connected to MQTT broker');
  })
  .on('error', function(err) {
    logger.error(err);
  });


//Create the API object that plugins will be passed
var API = require('./API.js');
var api = new API(logger, mqtt);

//api.publish('foo', 'bar');
