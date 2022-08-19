const { comparePasswod } = require('../helper/bcrypt');
const { createToken } = require('../helper/jwt');
const { User } = require('../models/index');

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw { name: "EmailPasswordRequired" }
            }
    
            const findUser = await User.findOne({ where: { email } });
    
            if (!findUser) {
                throw { name: "Invalid email or password" }
            }
    
            const comparePass = comparePasswod(password, findUser.password);
            
            if (!comparePass) {
                throw { name: "Invalid email or password" }
            }
    
            const payload = {
                id: findUser.id
            }
    
            const access_token = createToken(payload);
    
            res.status(200).json({
                message: "Success login!",
                access_token
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;