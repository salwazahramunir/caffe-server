const { User, Profile } = require('../models/index')

class UserController {
    static async readAllUser(req, res, next) {
        try {
            const users = await User.findAll({ include: [Profile]});

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
                message: "Success create user",
                user: newUser
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { username, email, password, role, fullName, dateOfBirth, gender, phoneNumber } = req.body
            const { id } = req.params

            let findUser = await User.findByPk(+id);

            if (!findUser) {
                throw { name: "NotFound" }
            }

            await User.update({ username, email, password, role }, { where: { id } });
            await Profile.update({ fullName, dateOfBirth, gender, phoneNumber }, { where: { user_id: id } })
            findUser = await User.findByPk(+id);
            const profile = Profile.findOne({ where: { user_id: id }})

            res.status(200).json({
                message: "Success update user",
                user: findUser,
                profile
            })
        } catch (error) {
            next(error)
        }
    }

    static async showUser(req, res, next) {
        try {
            const { id } = req.params

            const findUser = await User.findByPk(+id, {
                include: [Profile],
                attributes: {exclude: ['password']},
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
            let user = await User.findByPk(+req.user.id);

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
            
            const findProfileUser = await Profile.findOne({ where: { user_id: id } })

            if (!findProfileUser) {
                throw { name: "NotFound" }
            }

            await User.destroy({ where: { id } })

            res.status(200).json({
                message: `Success delete ${findProfileUser.fullName}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController