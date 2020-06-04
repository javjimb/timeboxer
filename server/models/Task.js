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
        },
        user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);
