const MQTT = require('./MQTT.js');
const config = require('./config.json');
const Logger = require('./Logger.js');

const DashButton = require('./plugins/DashButton.js');
const Weather = require('./plugins/Weather.js');
const Netatmo = require('./plugins/Netatmo.js');
const IPAddress = require('./plugins/IPAddress.js');
const SpeedTestNet = require('./plugins/SpeedTestNet.js');

//Create a logger
var logger = new Logger('CORE');

logger.info('Started mqtt-controller');


//Connect to the MQTT broker
var mqtt = new MQTT(logger);

mqtt.connect(config.broker.url, { username: config.broker.username, password: config.broker.password}).then(function() {
  logger.info('Connected to MQTT broker');

  //Create the API object that plugins will be passed
  var API = require('./API.js');

  config.plugins.forEach(function(pluginConfig) {
    var name = pluginConfig.name;
    var config = pluginConfig.config;

    var pluginLogger = new Logger(name);
    var api = new API(pluginLogger, mqtt);

    //Instantiate the plugin
    logger.info('Started ' + name);
    switch(name) {
      case 'DashButton':
        new DashButton(api, config).start();
        break;
      case 'Weather':
        new Weather(api, config).start();
        break;
      case 'Netatmo':
        new Netatmo(api, config).start();
        break;
      case 'IPAddress':
        new IPAddress(api, config).start();
        break;
      case 'SpeedTestNet':
        new SpeedTestNet(api, config).start();
        break;
    }
  });

});
