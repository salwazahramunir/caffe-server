const { RawMaterial, KitchenStore } = require('../models/index')
class RawMaterialController {
    static async readAllRawMaterial(req, res, next) {
        try {
            const rawMaterials = await RawMaterial.findAll({
                include: [
                    {
                        model: KitchenStore,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"]}
            })

            res.status(200).json({
                message: "Success read raw materials",
                rawMaterials
            })
        } catch (error) {
            next(error)
        }
    }

    static async createRawMaterial(req, res, next) {
        try {
            const { kitchen_store_id } = req.body

            const data = await KitchenStore.findByPk(+kitchen_store_id)

            if (!data) {
                throw { name: "NotFound" }
            }

            const [rawMaterial, created] = await RawMaterial.findOrCreate({
                where: { kitchen_store_id },
                defaults: {
                    kitchen_store_id,
                    souldOut: false,
                    quantity: data.quantity,
                }
            });
            
            if (!created) {
                const { id } = rawMaterial
                const quantity = rawMaterial.quantity + data.quantity
                await RawMaterial.update({ quantity, souldOut:false }, { where: { id } })    
            }

            await KitchenStore.increment({ stock: -1 }, { where: { id: kitchen_store_id } })

            const findKitchenStore = await KitchenStore.findByPk(+kitchen_store_id)

            res.status(201).json({
                message: `Success added ${findKitchenStore.name}`
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async showRawMaterial(req, res, next) {
        try {
            const { id } = req.params

            const findRawMaterial = await RawMaterial.findByPk(+id, {
                include: [
                    {
                        model: KitchenStore,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"]}
            })

            if (!findRawMaterial) {
                throw { name: "NotFound" }
            }

            res.status(200).json({ 
                message: "Success show raw material",
                rawMaterial: findRawMaterial
            })      
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RawMaterialController;