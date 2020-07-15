const mongoose = require('mongoose');
const {Schema} = mongoose;

const externalAuthSchema = new Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    provider: {
        type: String,
        enum: ['facebook', 'google'],
        required: true
    },
    providerId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('ExternalAuth', externalAuthSchema);
