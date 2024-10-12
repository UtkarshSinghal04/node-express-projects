const Jobs = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError } = require('../errors');
const { symbol } = require('joi');

const getAllJobs = async (req, res) => {
    const info = await Jobs.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({
        UserName: req.user.userName,
        Jobs: info
    });
};

const getJob = async (req, res) => {
    const jobId = req.params.id
    const userId = req.user.userId
    req.body.createdBy = req.user.userId

    const info = await Jobs.findOne({ _id: jobId, createdBy: userId })
    if (!info) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ info })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const info = await Jobs.create(req.body)
    res.status(StatusCodes.OK).json({
        UserName: req.user.userName,
        Jobs: info
    });
}

const updateJob = async (req, res) => {
    const {status} = req.body
    const jobId = req.params.id
    const userId = req.user.userId
    req.body.createdBy = req.user.userId
    if(!status)
        throw new UnauthenticatedError('please provide updated status')
    const info = await Jobs.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!info) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({info})
}

const deleteJob = async (req, res) => {
    const jobId = req.params.id
    const userId = req.user.userId
    req.body.createdBy = req.user.userId

    const info = await Jobs.findOneAndDelete({ _id: jobId, createdBy: userId })
    if (!info) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    const alljobs = await Jobs.find({createdBy: userId})
    res.status(StatusCodes.OK).json(alljobs)
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}

