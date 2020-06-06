'use strict';

const five = require('johnny-five');

five.Board().on('ready', () =>{
  console.log('ready');
  /**
   * Inicia el Hello World
   */
  // Create a standard `led` component instance
  const ledHello = new five.Led(13);
  // "blink" the led in 500ms
  ledHello.blink(500);
  
  /********************************** */
  /**
   * Inicia el Smart Lighting System
   */
  // Initialize the RGB LED
  var ledRGB = new five.Led.RGB({
    pins: {
      red  : 6,
      green: 5,
      blue : 3
    }
  });

  ledRGB.on();
  ledRGB.color({red: 0, blue: 0, green: 0});

  const pubnub = require('pubnub').init({
    publish_key  : 'pub-c-0b43969b-341d-41f5-a85e-0bd9d30404b8',
    subscribe_key: 'sub-c-cb24903e-c9f4-11e5-b684-02ee2ddab7fe'
  });

  const channel = 'hue-clone';

  pubnub.subscribe({
    channel,
    callback: setLedColor,
    connect : initLedColor,
    error: (err) =>{console.log(err);}
  });

  function setLedColor(m) {
    ledRGB.color({red: m.r, blue: m.b, green: m.g});
    console.log( 'color change to...' );
    console.log( ledRGB.color() );
  }

  function initLedColor() {
    pubnub.history({
      channel,
      count: 1,
      callback: (messages) =>{
        messages[0].forEach( (m) => {
          setLedColor(m);
        });
      }
    });
  }

});
