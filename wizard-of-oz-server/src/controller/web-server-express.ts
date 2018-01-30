import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import {User} from '../../../wizard-of-oz-common/class/user';

class WebServerExpress {
    public server: any;

    constructor() {
        const app = express();
        const server = http.createServer(app);
        const wss = new WebSocket.Server({ server });

        wss.on('connection', (ws: WebSocket) => {
            console.log('new connection');
            ws.on('message', (message: string) => {
                console.log('received: %s', message);

                // broadcast
                wss.clients.forEach(function each(client: WebSocket) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });

                // echo
                // ws.send(`Hello, you sent -> ${message}`);
            });

            ws.send('Hi there, I am a WebSocket server');
        });

        this.server = server;
    }
}

export default new WebServerExpress().server;