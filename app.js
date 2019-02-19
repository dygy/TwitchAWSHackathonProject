const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);
const websocket= require('./websocket');
let  messages = [];
const game = require('./game');
const shooterServer = require('./shooterServer');

const WebSocketServer = WebSocket.Server;
let gameSelect =require('../AWSChallangeTwitch — копия/models/game');

let command = {
    status :false,
    func:''
};
app.set("views", path.join(__dirname, "./views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./views'));
websocket(messages,command,WebSocketServer,server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/title.html');
});

app.get('/sceneOne', (req, res) => {
    res.sendFile(__dirname+'/views/sceneOne.html');
    gameSelect['game']='sceneOne'
});

app.get('/game', (req, res) => {
    game(req, res,messages,command);
    gameSelect['game']='game'
});
app.get('/shooter', (req, res) => {
    shooterServer(req, res,messages,command);
    gameSelect['game']='shooter'
});

let port_number =process.env.PORT || 3000;
server.listen(port_number,'0.0.0.0', () => console.log('Example app listening on port 3000!'));


module.exports = app;


