# Algoritmos de planeación de procesos

## Requisitos e instalación

- Tener previamente instalado nodejs en su ordenador. https://nodejs.org/en/download/

- Instalar las dependencias del package.json ```npm install```

- Ejecutar el comando ```npm start``` o ```npm run start_server``` dependiendo si tiene conexión a internet y quiere ver la interfaz.

## Formas de ejecución

### Ejecucion con interfaz
Utilizar el comando ```npm run start_server``` para poner en ejecución el servidor y poder acceder a ```http://localhost:3000/```.

Es indispensable contar con una conexión a internet pues en el archivo *index.html* utilizamos React desde el CDN 
```html
<head>
  <!-- ... -->
  <title>Planeación de procesos</title>
  <!-- Se importa el CDN de React -->
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <!-- Se Babel -->
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
```
### Ejecución con terminal

Utilizar el comando ```npm start```. Esto ejecutara el archivo *index.js* y tomara el JSON que contiene los datos del algoritmo a utilizar y el listado de procesos (Ver la estructura del JSON dentro de la carpeta examples).

Archivo: index.js
```js

const FIFO = require ('./algorithms/fifo');
const SJF  = require ('./algorithms/sjf');
const SRT         = require ('./algorithms/srt');
const PRIORIDADES = require ('./algorithms/prioridades');
const ROUND_ROBIN = require ('./algorithms/round-robin');

// Importamos el archivo JSON
const inputProcesos = require('PATH_DEL_EJEMPLO.json');

// ...
```
Archivo: PATH_DEL_EJEMPLO.json
```json
{
  "algoritmo" : "FIFO" || "SJF" || "PRIORIDADES" || "SRT" || "ROUND-ROBIN",
  "quantum"   : 2,
  "promedioT" : null,
  "promedioW" : null,
  "promedioP" : null,
  "procesos": [
    {
      "etiqueta"      : "A",
      "tiempoLlegada" : 0,
      "t"             : 3,
      "prioridad"     : null,
      "F"             : null,
      "T"             : null,
      "W"             : null,
      "P"             : null
    },
    {
      "etiqueta"      : "B",
      "tiempoLlegada" : 1,
      "t"             : 5,
      "prioridad"     : null,
      "F"             : null,
      "T"             : null,
      "W"             : null,
      "P"             : null
    },
    {
      "etiqueta"      : "C",
      "tiempoLlegada" : 3,
      "t"             : 2,
      "prioridad"     : null,
      "F"             : null,
      "T"             : null,
      "W"             : null,
      "P"             : null
    }
  ]
}
```
