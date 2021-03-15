// * Middleware - Funções de verificações (By @mrslovely_ao, @Shidevolin)
function authorize(req, res, next) {
    if(!req.session.user || !req.cookies.SessionCookie){
        return res.status(401).json({
            status: false
        });
    } else {
        next();
    }
};

// Function to check for logged-in users
function sessionChecker (req, res, next) {
    if (req.session.user && req.cookies.SessionCookie) {
        res.redirect('/home');
    } else {
        next();
    }
};

module.exports = {
                    "auth": authorize,
                    "sessChecker": sessionChecker
                };