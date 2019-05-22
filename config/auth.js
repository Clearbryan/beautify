module.exports = function ensureAuthenticated (req, res, next){
    const token = req.headers.authorization;
    console.log(req)
    next();    
}