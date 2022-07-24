const http = require('http');
const { WebSocket } = require('ws');

const express = require('express');
const app = express();

const port = 6969;
const server = http.createServer(app);

const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws){
    ws.on('message', (data) =>{

        const outbound = JSON.stringify(data); 

        wss.clients.forEach(function each(client) {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(outbound);
            }
        })

        console.log('received: %s', data);
    })
});

server.listen(port, function () {
    console.log(`server is listening on port ${port}`);
});