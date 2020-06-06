// const SerialPort = require('serialport');
// const portName = '/dev/tty.usbmodem1411';

// const port = new SerialPort(portName, {
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false,
//     // parser: SerialPort.parsers.readline("\r\n")
// });

// // Read data that is available but keep the stream in "paused mode"
// /* port.on('readable', function () {
//   console.log('Data:', port.read())
// }) */
// port.on('readable', function () {
//   console.log('Data:', port.read())
// })

// port.on('data', function(input) {
//     console.log(input);
// });




const SerialPort = require('serialport');
// const port = new SerialPort('/dev/tty.usbmodem1411');
const port = new SerialPort('COM5 (Arduino/Genuino Uno)');

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }   
  console.log('message written');
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})