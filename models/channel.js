const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    content: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // reactions: type: {type: Array}  icebox feature
}, {
    timestamps: true
});


const channelSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String },
    favoriteUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [messageSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Channel", channelSchema);
