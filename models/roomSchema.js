const mongoose = require('mongoose');
const Category = require('./categorySchema');

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },
});

//metodo populate para hacer referencia a la categoria




const Room = mongoose.model('Room', roomSchema);

module.exports = Room;