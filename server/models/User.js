const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: String,
        surname: String,
        email: {
            type: String,
            required: true,
            unique: 1,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema);
