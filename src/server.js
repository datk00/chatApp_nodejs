import express from 'express';
import runWebSocketServer from './wss/wss.js';
import dotenv from 'dotenv'

dotenv.config();
const app = express();



app.set('view engine', 'ejs');
app.set('views', './src/views')

import {
    chatRouter,
} from './routes/index.js'

runWebSocketServer()

app.use('/chat', chatRouter)

const PORT_SERVER = process.env.PORT_SERVER
app.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${PORT_SERVER}`);
})