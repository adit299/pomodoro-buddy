const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// The schema is essentially like a blueprint, what the data being passed in should look
// like and what should be included within it

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;