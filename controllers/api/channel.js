const Message = require("../../models/channel");
const Channel = require("../../models/channel");

module.exports = {
    channelCreate,
}

async function channelCreate(req, res) {
    const channel = await Channel.create(req.body)
    //send to list of channels? 
    channel.save(function (err) {
        if (err) return res.redirect('/channels/new');
        res.redirect(`/channels/${channel._id}`);
    })
}