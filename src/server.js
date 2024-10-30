import express from 'express';
import runWebSocketServer from './wss/wss.js';
import dotenv from 'dotenv'
import http from 'http'
dotenv.config();
const app = express();
const server = http.createServer(app);


app.set('view engine', 'ejs');
app.set('views', './src/views')

import {
    chatRouter,
} from './routes/index.js'

runWebSocketServer(server)

app.use('/chat', chatRouter)

const PORT_SERVER = process.env.PORT_SERVER
server.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${PORT_SERVER}`);
})