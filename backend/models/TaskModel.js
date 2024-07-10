const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Subjects: {
            type: String,
            required: true
        },
       
    },
    {
        timestamps: true
    }
);


const Task = mongoose.model('Task', TaskSchema);



module.exports = Task;


