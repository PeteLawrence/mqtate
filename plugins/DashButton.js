'use strict';

var dash_button = require('node-dash-button');


class DashButton {

  constructor(api, config) {
    //Build an array of MAC addresses of Dash buttons to listen for
    var buttonsToDetect = [];
    config.buttons.forEach(function(buttonConfig) {
      buttonsToDetect.push(buttonConfig.address);
    });


    //Start listening for button pressed
    var dash = dash_button(buttonsToDetect, null, null, 'all');

    //
    dash.on('detected', function (addr){
      var buttonName = getNameFromAddress(addr);

      api.logger.info('Detected press of ' + buttonName);

      api.mqtt.publish('dash/' + buttonName, 'ON');

      //Reset the state of the button after 2 seconds (2000ms)
      setTimeout(resetState, 2000, buttonName);
    });


    /**
     * Resets the state of a Dash Button
     *
     * @param {[type]} name [description]
     */
    function resetState(name) {
      api.logger.info('Reset ' + name);
      api.mqtt.publish('dash/' + name, 'OFF');
    }


    /**
     * Gets the name of a Dash Button from its MAC address
     *
     * @param  {[type]} address [description]
     *
     * @return {[type]}         [description]
     */
    function getNameFromAddress(address) {
      for (let buttonConfig of config.buttons) {
        if (buttonConfig.address == address) {
          return buttonConfig.name;
        }
      };
    }
  }

}

module.exports = DashButton;
