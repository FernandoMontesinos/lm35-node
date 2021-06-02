// Traemos express
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, function() {
    console.log('server escuchando en el puerto', 3000);
});


// Con todo esto extraemos los datos del arduino 
// Traemos a la dependencia xd
const Serialport = require('serialport');
// Para poder ver la lectura cvr
const Readline = Serialport.parsers.Readline;

// Donde estará
const port = new Serialport('COM6', {
    baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: '\r\n'}));

parser.on('open', function() {
    console.log("coneccion abierta");
});

parser.on('data', function(data) {
    let temp = parseInt(data, 10) + " °C";
    console.log(temp);
    io.emit('temp', data);
});

port.on('error', function(err) {
    console.log(err);
});

// No instala la dependencia :(, buscar solucion , que supuestamente es el compilador
// Lo solucione xd