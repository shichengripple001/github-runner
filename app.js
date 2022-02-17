const https = require('https');
const fs = require('fs');
const ws = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('test.abc.crt', 'utf8'),
  key: fs.readFileSync('test.abc.key', 'utf8')
});
const wss = new ws.WebSocketServer({ server });

wss.on('connection', function connection(ws,req) {
  console.log(req.socket.remoteAddress);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

server.listen(8082);


// var fs = require('fs');
// var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('test.abc.key', 'utf8');
// var certificate = fs.readFileSync('test.abc.crt', 'utf8');
//
// var credentials = {key: privateKey, cert: certificate};
// var express = require('express');
// var app = express();
//
// // your express configuration here
//
// app.get('/', (req, res) => {
//   let str = `Hello ${req.socket.remoteAddress}`
//   res.send(str)
// })
// //var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
//
// //httpServer.listen(8080);
// httpsServer.listen(8443);
