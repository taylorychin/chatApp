const Channel = require("../models/channel");

let io;

module.exports = {
    init,
    getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) {

        // Other message listeners below here (stay inside of this 'connection' callback)
        socket.on("join-channel", async ({ id: channelId, name }) => {
            socket.join(channelId);
            socket.userName = name;
            const channel = await Channel.findById(channelId);
            //able to  use html tags in comments because of the dangerously set html in channeldetailpage
            channel.messages.push({
                ownerName: "System",
                content: `<span style="color:green">${name} has joined the channel.</span>`
            });
            await channel.save();
            io.to(channelId).emit("channel-updated", channel);
        });

        socket.on("leave-channel", async (channelId) => {
            socket.leave(channelId);
            const channel = await Channel.findById(channelId);
            channel.messages.push({
                ownerName: "System",
                content: `<span style="color:red">${socket.userName} has left the channel. </span>`
            });
            await channel.save();
            io.to(channelId).emit("channel-updated", channel);
        });

    });


}

// Used to access the io object from controller modules
function getIo() {
    return io;
}