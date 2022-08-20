const { User, Profile } = require('../models/index')

class UserController {
    static async readAllUser(req, res, next) {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Profile,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["password", "createdAt", "updatedAt"]}
            });

            res.status(200).json({
                message: "Success read users",
                users
            })
        } catch (error) {
            next(error)
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email, password, role } = req.body

            const newUser = await User.create({ username, email, password, role })

            await Profile.create({ user_id: newUser.id })

            res.status(201).json({ 
                message: `Success create user ${newUser.username}`,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        try {
            let { password } = req.body
            const { username, email, role, fullName, dateOfBirth, gender, phoneNumber } = req.body
            const { id } = req.params

            let findUser = await User.findByPk(+id);

            if (!findUser) {
                throw { name: "NotFound" }
            }

            if (!password) {
                password = findUser.password
            }

            await User.update({ username, email, password, role }, { where: { id }, individualHooks: true });
            await Profile.update({ fullName, dateOfBirth, gender, phoneNumber }, { where: { user_id: id } })
            findUser = await User.findByPk(+id);

            res.status(200).json({
                message: `Success update user ${findUser.username}`,
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async showUser(req, res, next) {
        try {
            const { id } = req.params

            const findUser = await User.findByPk(+id, {
                include: [
                    {
                        model: Profile,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["password", "createdAt", "updatedAt"]}
            })

            if (!findUser) {
                throw { name: "NotFound" }
            }

            res.status(200).json({ 
                message: "Success show user",
                user: findUser
            })
        } catch (error) {
            next(error)
        }
    }

    static async profileUser(req, res, next) {
        try {
            let user = await User.findByPk(+req.user.id, {
                include: [
                    {
                        model: Profile,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["password", "createdAt", "updatedAt"]}
            });

            if (!user) {
                throw { name: "Not Found" }
            }

            res.status(200).json({
                message: "Success show user",
                user
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            
            const findUser = await User.findByPk(+id, {
                include: [
                    {
                        model: Profile,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["password", "createdAt", "updatedAt"]}
            })

            if (!findUser) {
                throw { name: "NotFound" }
            }

            await User.destroy({ where: { id } })

            res.status(200).json({
                message: `Success delete ${findUser.username}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController