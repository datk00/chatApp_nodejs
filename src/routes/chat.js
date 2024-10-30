import express from 'express';
import dotenv from 'dotenv'


dotenv.config()
const router = express.Router(); 

router.get('/', async (req, res) => {
    res.render('chat', {PORT_SERVER: process.env.PORT_SERVER})
})



export default router