const errorHandler = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json("something went wrong");
}

module.exports = errorHandler;