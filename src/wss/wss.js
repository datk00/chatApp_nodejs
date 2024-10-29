import {WebSocketServer } from 'ws';
import dotenv from 'dotenv'


dotenv.config();
const USER_IN_PUBLIC = {}

const broadcastOnlineCount = () => {
    const onlineCount = Object.keys(USER_IN_PUBLIC).length;
    const message = JSON.stringify({
        type: 'numberOnline',
        number: onlineCount,
    });
    
    // Gửi số lượng người online tới tất cả người dùng
    for (const key in USER_IN_PUBLIC) {
        USER_IN_PUBLIC[key].send(message);
    }
    console.log(onlineCount)
};


const handleReceivedMessage = async (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message); // Giả định rằng message là một JSON string

        if (data.type === 'JOIN_ROOM') {
            USER_IN_PUBLIC[data.user._id] = ws
            broadcastOnlineCount()
        } 
        else if (data.type === 'SEND_MESSAGE_PUBLIC') {
            const _idUser_sendMessage = data.user._id 
            for (const _idUser in USER_IN_PUBLIC) {
                if (_idUser !== _idUser_sendMessage) {
                    USER_IN_PUBLIC[_idUser].send(JSON.stringify({
                        type: 'NEW_MESSAGE_PUBLIC',
                        text: data.text,
                        timestamp: data.timestamp,
                        user: {
                            name: data.user.name,
                            _id: data.user._id,
                            char_avartar: data.user.char_avartar,
                        }
                    }));
                }
            }
        }

    });
};



const runWebSocketServer = async () => {
    const wss = new WebSocketServer({port: process.env.PORT_SOCKET});
    
    wss.on('connection', (ws) => {
        handleReceivedMessage(ws)
        broadcastOnlineCount()
   
        ws.on('close', () => {
            for (const key in USER_IN_PUBLIC) {
                if (USER_IN_PUBLIC[key] === ws) {
                    delete USER_IN_PUBLIC[key];
                }
            }
            // Gửi số lượng người online sau khi có người rời
            broadcastOnlineCount();
        });
    })
    
    console.log(`WebSocket server is running on port ${process.env.PORT_SOCKET}`);
}

export default runWebSocketServer