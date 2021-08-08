const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: { type: String, required: true },
    ownerId: { type: String, required: true },
    // reactions: type: {type: Array}  icebox feature

})

module.exports = mongoose.model('message', messageSchema);