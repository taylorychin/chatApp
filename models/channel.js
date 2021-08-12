const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    content: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ownerName: { type: String, required: true, }
    // reactions: type: {type: Array}  icebox feature
}, {
    timestamps: true
});


const channelSchema = new Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    favoriteUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [messageSchema]
}, {
    timestamps: true
});

channelSchema.virtual('channelId').get(function () {
    return this.id.slice(-6).toUpperCase();
});


module.exports = mongoose.model("Channel", channelSchema);
