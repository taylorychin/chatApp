// const Message = require("../../models/channel");
const io = require("../../config/io");
const Channel = require("../../models/channel");

module.exports = {
    create,
    getAll,
    getOne,
    send,
}


async function getAll(req, res) {
    // the '-messages' means to exclude the messages property 
    const channels = await Channel.find({}).sort('title').select('-messages').exec();
    res.json(channels);
}

async function create(req, res) {
    try {
        req.body.favoriteUsers = [req.user._id];
        const channel = await Channel.create(req.body)
        res.json(channel);
    } catch (err) {
        res.json(err.message);
    }
}

async function getOne(req, res) {
    try {
        const channel = await Channel.findById(req.params.id);
        res.json(channel);
    }
    catch (err) {
        res.json(err.message);
    }
}

async function send(req, res) {
    const channel = await Channel.findById(req.params.id);
    req.body.ownerId = req.user._id;
    req.body.ownerName = req.user.name;
    channel.messages.push(req.body);
    await channel.save();
    const ioInstance = io.getIo();
    ioInstance.to(req.params.id).emit("channel-updated", channel)
    res.json("message sent");
}
