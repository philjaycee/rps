module.exports = (req, res, next) => {
    if (req.isAuthenticatd()) return next()
    res.redirect('/login')
}