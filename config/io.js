let io;

module.exports = {
    init,
    getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) {
        console.log('Client socketed connected');

        // Other message listeners below here (stay inside of this 'connection' callback)
        socket.on("join-channel", (channelId) => {
            console.log("client joined channel: ", channelId);
            socket.join(channelId);
        });
        socket.on("leave-channel", (channelId) => {
            console.log("client left channel: ", channelId);
            socket.leave(channelId);
        });

    });
}

// Used to access the io object from controller modules
function getIo() {
    return io;
}