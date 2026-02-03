import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//! readyStates type
//* 0: Connecting
//* 1: Open ( The only state where we can use .send() )
//* 2: Closing
//* 3: Closed

//? Connection
wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData) => {
        const message = rawData.toString();
        console.log({ rawData });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(`Server Broadcast: ${message}`)
        })
    });

    socket.on('error', (err) => {
        console.log(`Error : ${err.message}: ${ip}`);
    });

    socket.on('close', () => {
        console.log("Client is now disconnected");
    })
});

console.log("Websocket server is live on ws://localhost:8080");
