// const Message = require("../../models/channel");
const Channel = require("../../models/channel");

module.exports = {
    create,
    getAll,
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