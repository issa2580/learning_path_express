function log (req, res, next) {
    console.log('authenticated...')
    next()
}

module.exports = log