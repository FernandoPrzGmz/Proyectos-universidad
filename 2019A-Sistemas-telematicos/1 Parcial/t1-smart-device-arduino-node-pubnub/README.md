# How to Create a Smart Device With Arduino and Node.js Using PubNub
---
## NOTAS:
* El contenido de este readme es un respaldo al contenido de la pagina: https://code.tutsplus.com/tutorials/how-to-create-a-smart-device-with-arduino-and-nodejs-using-pubnub--cms-25508

* Es necesario instalar firmata para trabajar con johnny-five
  ```
  npm install --save firmata
  ```

* Instalar "pubnub": "^3.7.15", la version actual genera problema con el codigo del tutorial.
  ```
  npm install --save pubnub@^3.7.15
  ```

---
## Setting Up Arduino
Hardware and software you need:
- Arduino (Genuino) Uno 
- Arduino IDE
- Node.js

First connect your Arduino Uno to your computer with a USB cable. Meanwhile, download the Arduino IDE and install it on your computer. You will need the IDE only for the initial setup.

On Arduino IDE, go to **Tools > Port** and make sure the right board, Arduino Uno, is connected to the right port (tty.usbmodem… for Mac, cu.usbmodem… for Windows).

Johnny-Five communicates with Arduino using the Firmata protocol, so you need to install StandardFirmata:

- On IDE, open **File > Examples > Firmata > StandardFirmata**.
- Click the upload button (arrow button).
- Wait until the IDE message window says “Done uploading”.
- Close the IDE. You don’t need the IDE anymore unless you want to keep using it for coding.

## Hello World
Make sure Node.js is installed on your machine. Create an appropriate directory like js-hello, and then cd into the directory and install Johnny-five using the npm package manager.

```
npm install --save johnny-five
```
Now, let’s write Hello World with Johnny-Five. Since you’ve got some shiny hardware, you’re going to create the “Hello world” of hardware, which is a blinking LED light!

Hardware You Need
- 1 Arduino Uno
- 1 LED
- 1 breadboard
- 2 male/male jumper wire (1 red, 1 black)
- 1 resistor（200 - 330Ω）

### Know Your LEDs
LEDs, short for light-emitting diodes, are polarized: the positive (+) side is called the anode, and the negative side is called the cathode. Usually, each LED has two legs, and the longer leg is an anode pin. This is important when you build a circuit.

### Assembling a Circuit
Let’s use a color convention to avoid confusion:
- Black wires for ground
- Red wires for voltage

Your wires do not have to be red and black, but do use two different colors so you don’t confuse yourself. The best practice is to use red to connect to the positive end (in this practice, use pin 13), and block to ground (GND pin).

![Alt text](https://cms-assets.tutsplus.com/uploads/users/48/posts/25508/image/Arduino-circuit-board.png)


### Blinking an LED With Johnny-Five
Now, you are going to work on the software side.

Create a file, blink.js, and paste the code below:

```js
  var five = require('johnny-five');
  var board = new five.Board();
  
  board.on('ready', function() {
    var led = new five.Led(13); // pin 13
    led.blink(500); // 500ms interval
  });
```

Run:
```
  $ sudo node blink.js
```

The LED should blink at a 500ms interval, otherwise check both the circuit and code.

![Alt text](https://lh6.googleusercontent.com/WjeRAj32yMXhcLljGQ4sXi8N5sKwXu47zC_UtKNViwTyaifxeepAEOXzRSUCZNIEsQ-Vm4Ss_FIYbhu_lA8BigV20cwa5i_ttPuPBYLhLV7EJvhw6UFGc8sHymhxfdyT5e89g_qH)

---

## Prototyping a Smart Lighting System

PubNub Data Stream Network (DSN) provides global infrastructure, and allows you to build and scale real-time apps and IoT devices quite easily. The smart LED you are going to create works as follows:

![Alt text](https://cms-assets.tutsplus.com/uploads/users/48/posts/25508/image/Arduino-LED-green.png)

### Hardware You Need
- 1 Arduino Uno
- 1 RGB LED (Common cathode)
- 1 Breadboard
- 4 male/male jumper wires (red, green, blue, black)
- 1 Resistor (220Ω x 2, 330Ω x 1）

### Assembling the Circuit

![Alt text](https://cms-assets.tutsplus.com/uploads/users/48/posts/25508/image/arduino-uno-rgb-led.png)

### Files
File: index.html (Open in browser)
```html
<!doctype html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <section class="preference">

    <div>
      <div class="caption red">Red</div>
      <label for="red" class="brightness fa">
        <input id="red" type="range" min="1" max="255" step="1" value="0">
      </label>
    </div>

    <div>
      <div class="caption green">Green</div>
      <label for="green" class="brightness fa">
        <input id="green" type="range" min="1" max="255" step="1" value="0">
      </label>
    </div>
    
    <div>
      <div class="caption blue">Blue</div>
      <label for="blue" class="brightness fa">
        <input id="blue" type="range" min="1" max="255" step="1" value="0">
      </label>
    </div>

  </section>


  <script src="http://cdn.pubnub.com/pubnub-3.7.15.min.js"></script>
  <script>
(function(){

  var pubnub = PUBNUB.init({
    publish_key: 'pub-c-0b43969b-341d-41f5-a85e-0bd9d30404b8',
    subscribe_key: 'sub-c-cb24903e-c9f4-11e5-b684-02ee2ddab7fe'
  });

  var channel = 'hue-clone';

  var red = document.getElementById('red');
  var green = document.getElementById('green');
  var blue = document.getElementById('blue');

  // Initial brightness state
  var brightness = {r: 0, g: 0, b: 0}; 


  // UI Reset: Subscribe data from all subscibers of the channel to set the state correctly

  pubnub.subscribe({
    channel: channel,
    message: resetSliders, // reset the slider UI every time a subscriber makes a change
    connect: initSliders // initialize the slider states for the fisrt time launching the app
  });

  function resetSliders(m) {
    red.value = brightness.r = m.r;
    green.value = brightness.g = m.g;
    blue.value = brightness.b = m.b;
  }

  function initSliders() {
    pubnub.history({
      channel: channel,
      count: 1,
      callback: function(messages) {
        messages[0].forEach(function(m) {
          console.log(m);
          resetSliders(m);
        });
      }
    });
  }

  function publishUpdate(data) {
    console.log(data);

    pubnub.publish({
      channel: channel, 
      message: data
    });
  }

  // UI EVENTS

  red.addEventListener('change', function(e){
    brightness.r = this.value;
    publishUpdate(brightness);
  }, false);

  green.addEventListener('change', function(e){
    brightness.g = this.value;
    publishUpdate(brightness);
  }, false);

  blue.addEventListener('change', function(e){
    brightness.b = this.value;
    publishUpdate(brightness);
  }, false);

})();
  </script>
  
</body>
</html>
```

File: index.js (run with node)
```js
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

```
