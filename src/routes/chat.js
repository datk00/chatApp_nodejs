import express from 'express';
import dotenv from 'dotenv'


dotenv.config()
const router = express.Router(); 

router.get('/', async (req, res) => {
    res.render('chat', {PORT_SOCKET: process.env.PORT_SOCKET})
})



export default router