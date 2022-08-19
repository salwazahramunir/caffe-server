const { Room } = require('../models/index')
class RoomController {
    static async readAllRoom(req, res, next) {
        try {
            const rooms = await Room.findAll()

            res.status(200).json({
                message: "Success read rooms",
                rooms
            })
        } catch (error) {
            next(error)
        }
    }

    static async createRoom(req, res, next) {
        try {
            const { codeRoom, nameRoom, category, price, duration } = req.body

            const newRoom = await Room.create({ codeRoom, nameRoom, category, price, duration, isEmpty:true })

            res.status(201).json({
                message: "Success create room",
                room: newRoom
            })
        } catch (error) {
            next(error)
        }
    }

    static async showRoom(req, res, next) {
        try {
            const { id } = req.params

            const findRoom = await Room.findByPk(+id)

            if (!findRoom) {
                throw { name: "NotFound" }
            }

            res.status(200).json({ 
                message: "Success show room",
                room: findRoom
            })      
        } catch (error) {
            next(error)
        }
    }

    static async updateRoom(req, res, next) {
        try {
            const { codeRoom, nameRoom, category, price, duration, isEmpty } = req.body
            const { id } = req.params

            let findRoom = await Room.findByPk(+id)

            if (!findRoom) {
                throw { name: "NotFound" }
            }

            await Room.update({ codeRoom, nameRoom, category, price, duration, isEmpty }, { where: { id }})
            findRoom = await Room.findByPk(+id)

            res.status(201).json({
                message: "Success update room",
                room: findRoom
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteRoom(req, res, next) {
        try {
            const { id } = req.params;

            const findRoom = await Room.findByPk(+id)

            if (!findRoom) {
                throw { name: "NotFound"}
            }

            await Room.destroy({ where: { id } })

            res.status(200).json({
                message: `Success delete ${findRoom.nameRoom}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoomController