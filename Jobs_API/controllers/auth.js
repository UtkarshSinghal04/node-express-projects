const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError} = require('../errors')
const {UnauthenticatedError} = require('../errors')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.getToken()
    res.status(StatusCodes.CREATED).json({user: user, token : token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password)
    throw new BadRequestError('Please provide email and password')

    const user =  await User.findOne({email})
    
    if(!user)
    throw new UnauthenticatedError('Invaild Credentials')

    //compare passwords
    const isPasswordCorrect = await user.matchPassword(password)
    if(!isPasswordCorrect)
    throw new UnauthenticatedError('Invaild Credentials')

    const token = user.getToken()
    res.status(StatusCodes.OK).json({user: user, token: token})
}

module.exports = {
    register, 
    login
}