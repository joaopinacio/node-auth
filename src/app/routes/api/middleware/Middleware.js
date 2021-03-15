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

// * Lembrar de tratar body diferenciados (By @Hugo_Mesquita)
// * Função para validar tipos de parametros expecíficos no body
function validateParams (requestParams) {
    return function (req, res, next) {
        for (let param of requestParams) {
            if (checkParamPresent(Object.keys(req.body), param)) {
                let reqParam = req.body[param.paramKey];
                if (!checkParamType(reqParam, param)) {
                    return res.status(400).json({
                        status: 400,
                        result: `${param.paramKey} is of type ` +
                        `${typeof reqParam} but should be ${param.type}`
                    });
                } else {
                    if (!runValidators(reqParam, param)) {
                        return res.status(400).json({
                            status: 400,
                            result: `Validation failed for ${param.paramKey}`
                        });
                    }
                }
            } else if (param.required){
                return res.status(400).json({
                    status: 400,
                    result: `Missing Parameter ${param.paramKey}`
                });
            }
        }
        next();
    }
};

const checkParamPresent = function (reqParams, paramObj) {
    return (reqParams.includes(paramObj.paramKey));
};

const checkParamType = function (reqParam, paramObj) {
    const reqParamType = typeof reqParam;
    return reqParamType === paramObj.type;
};

const runValidators = function (reqParam, paramObj) {
    if(paramObj.validator_functions){
        for (let validator of paramObj.validator_functions) {
            if (!validator(reqParam)) {
                return false
            }
        }
    }
    return true;
};

module.exports = {
                    "auth": authorize,
                    "sessChecker": sessionChecker,
                    "validateParams": validateParams
                };