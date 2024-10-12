const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        minlength: 3,
        maxlength: 30,
    },

    email: {
        type: String,
        required: [true, 'please provide a mail'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid mail'
        ],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'please provide a password'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            'password must have at least one lowercase letter, one uppercase letter, one number, one special character, and must be at least 8 characters long'
        ]
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.getToken = function () {
    let token = jwt.sign({ userId: this._id, userName: this.name}, process.env.JwtSecret, {expiresIn :'30d'})
    return token;
}   

UserSchema.methods.matchPassword =  async function (candidatePassword) {
    const isPasswordCorrect = await bcryptjs.compare(candidatePassword, this.password)
    return isPasswordCorrect
}

module.exports = mongoose.model('User', UserSchema)