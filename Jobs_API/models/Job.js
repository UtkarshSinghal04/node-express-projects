const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide company name'],
        maxlength: 50
    },
    position : {
        type: String, 
        required : [true, 'please provide position'],
        maxlength: 100
    },
    status: {
        type: String, 
        enum: ['PPT', 'OA', 'Interview', 'Accepted', 'Rejected'],
        default: 'PPT'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: [true, 'please provide user'],
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Jobs', JobSchema)