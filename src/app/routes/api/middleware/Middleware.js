// * Middleware - Funções de verificações (By @mrslovely_ao, @Shidevolin)
function authorize(req, res, next) {
    if(req.body.idUser == 0){
        return res.status(401).json({
            status: false
        });
    } else {
        next();
    }
}

module.exports = {authorize};