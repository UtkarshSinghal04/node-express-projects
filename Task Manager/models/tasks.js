const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    name: {
        type: String, 
        trim: true, 
        required: [true, "name can't be empty"], 
        maxlength: [30, "name can't be more than 30 char"] 
    }, 

    completed: {
        type: Boolean, 
        default: false
    }, 

    otherDetails : String
})

module.exports = mongoose.model('Task', TaskSchema);