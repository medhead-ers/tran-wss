import { createClient } from 'redis';
import {WebSocketServer} from "ws";

let redisClient = createClient({
    socket: {
        host: 'redis',
        port: '6379'
    }
});
await redisClient.connect();

const WEB_SOCKET_PORT = 3500;
const wsServer = new WebSocketServer({ port : WEB_SOCKET_PORT });

wsServer.on('connection', ws => {
    redisClient.subscribe('medhead.ers.messages', (message) => {
        ws.send(message);
    });
})
