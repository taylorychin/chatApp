const Message = require('../../models/message');

module.exports = {
    content,
    ownerId,
    //reactions
}

//get content of the message
async function content(req, res) {
    const content = await Message.getMessage(req.user._id);
    res.json(content);
}

//get owner ID of the message
async function ownerId(req, res) {
    const ownerId = await ownerId.getMessage(req.user._id);
    res.json(ownerId);
}

