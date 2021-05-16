const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

var PORT=process.env.PORT || 5000;
//const dataMap = require('ipsocketid')

let map=new Map();

const server=require("http").createServer(app);
const io=require("socket.io")(server,{cors:{origin:"*"}});

app.use(cors())
app.get('/video', (req, res) => {
    res.sendFile('assets/video1.mp4', { root: __dirname });
});

//videos route
const Videos = require('./routes/Videos')
app.use('/videos', Videos)

//server for socket io and endpoints
server.listen(PORT, () => {
    console.log('Listening on port 5000!')
}); 



// server.listen(5001, () => {
//     console.log('Listening on port 5001!')
// }); 

io.on("connection",(socket)=>{
    socketid=socket.id;
    console.log("User connected");
    console.log("socket id:"+socketid);
    var clientIp = socket.request.connection.remoteAddress;
    console.log("Client ip:"+clientIp);
    map.set(socketid,clientIp);
    console.log(map);
    socket.on("message",(data)=>{
        console.log(data);
    })
})

