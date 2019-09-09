const express = require('express');
const axios = require("axios");
const app = express();



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index');
})

server = app.listen(3000);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    //default username
    socket.username = 'Anonymous';

    // listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
        console.log('New user connected:', socket.username);
    });

    // listen on new message
    socket.on('new_message', (data) => {
        // broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
        axios.get('http://sandbox.api.simsimi.com/request.p',
            {
                params:
                {
                    key: "fce83208-d5ba-44d2-8e94-9ea22347019f",
                    text: data.message,
                    lc: 'vn',
                    ft: 1.0,
                }
            })
            .then(response => {
                io.sockets.emit('new_message', { message: response.data.response, username: 'Chat Bot' });
            })
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username });
    })
});