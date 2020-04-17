const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema(
    {
        name: String,
        start: Number,
        end: Number,
        duration: Number, // in hours
        status: {
            type: String,
            enum: ['new', 'in-progress', 'completed', 'scheduled'],
            default: 'new'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('task', taskSchema);
