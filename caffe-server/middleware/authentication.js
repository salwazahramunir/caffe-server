const { User } = require("../models/index")
const { verifyToken } = require("../helper/jwt")

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
    
        if (!access_token) {
            throw { name: "NoToken" }
        }
    
        const payload = verifyToken(access_token)
        
        const findUser = await User.findByPk(+payload.id)

        if (!findUser) {
            throw { name: "Unauthorized" }
        }

        req.user = {
            id: findUser.id,
            role: findUser.role
        }

        next();
    
    } catch (error) {
        console.log(error, "<<<<<<<<<<<<<<< err controller");
        next(error)
    }
}

module.exports = {
    authentication
}
