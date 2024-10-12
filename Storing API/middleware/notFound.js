const notFound = (req, res) => {
    return res.status(404).send('route does not exist');
}

module.exports = notFound;