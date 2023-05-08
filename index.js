let express = require('express');
let socket = require('socket.io')

//---=> app setup <=----//

let app = express();

//---=> sever setup <=----//

let sever = app.listen(4040,()=>{
    console.log('this is port 4000');
});

//---=> route setup <=----//

app.get('/',(res,req)=>{
    req.sendFile(__dirname+'/public/index.html');
});

//---=> socket setup <=----//

let io = socket(sever)
io.on('connection',(socket)=>{
    socket.on('chat',(data)=> {
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(name)=>{
        socket.broadcast.emit('typing',name);
    })
});

