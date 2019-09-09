$(function () {
    var socket = io.connect('http://localhost:3000');

    // button and input
    var message = $('#message');
    var username = $('#username');
    var send_message = $('#send_message');
    var send_username = $('#send_username');
    var chatroom = $('#chatroom');
    var feedback = $('#feedback');
    var input = document.getElementById("message");

    // emit message 
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() });
    });

    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            socket.emit('new_message', { message: message.val() });
        }
    });

    // listen on message
    socket.on('new_message', (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    });

    // emit typing
    message.bind('keypress', () => {
        socket.emit('typing');
    });

    // listen on typing
    socket.on('typing', (data) => {
        feedback.html('<p><i>' + data.username + 'is typing a message...' + '</i></p>');
    })

    // emit a username
    send_username.click(function () {
        socket.emit('change_username', { username: username.val() });
    });
});