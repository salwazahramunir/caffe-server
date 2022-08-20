const { KitchenStore, RawMaterial } = require('../models/index')
class KitchenStoreController {
    static async readAllKitchenStore(req, res, next) {
        try {
            const kitchenStore = await KitchenStore.findAll({
                include: [
                    {
                        model: RawMaterial,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"]}
            })
    
            res.status(200).json({
                message: "Success read food kitchen stores",
                kitchenStore
            })
        } catch (error) {
            next(error)
        }
    }

    static async createKitchenStore(req, res, next) {
        try {
            const { name, quantity, unit, stock } = req.body

            const newKitchenStore = await KitchenStore.create({ name, quantity, unit, stock })

            res.status(201).json({
                message: `Success create ${newKitchenStore.name}`
            })
        } catch (error) {
            next(error)
        }
    }

    static async showKitchenStore(req, res, next) {
        try {
            const { id } = req.params

            const findKitchenStore = await KitchenStore.findByPk(+id, {
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })

            if (!findKitchenStore) {
                throw { name: "NotFound" }
            }

            res.status(200).json({ 
                message: "Success show kitchen store",
                kitchenStore: findKitchenStore
            })            
        } catch (error) {
            next(error)
        }
    }

    static async updateKitchenStore(req, res, next) {
        try {
            const { name, quantity, unit, stock } = req.body
            const { id } = req.params

            let findKitchenStore = await KitchenStore.findByPk(+id)

            if (!findKitchenStore) {
                throw { name: "NotFound" }
            }

            await KitchenStore.update({ name, quantity, unit, stock }, { where: { id }})
            findKitchenStore = await KitchenStore.findByPk(+id)

            res.status(201).json({
                message: `Success update ${findKitchenStore.name}`,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteKitchenStore(req, res, next) {
        try {
            const { id } = req.params;

            const findKitchenStore = await KitchenStore.findByPk(+id)

            if (!findKitchenStore) {
                throw { name: "NotFound"}
            }

            await KitchenStore.destroy({ where: { id } })

            res.status(200).json({
                message: `Success delete ${findKitchenStore.name}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = KitchenStoreController;