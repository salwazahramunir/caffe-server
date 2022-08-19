const { LogRawMaterial, RawMaterial, KitchenStore } = require('../models/index')
class LogRawMaterialController {
    static async readAllLogRawMaterial(req, res, next) {
        try {
            const logRawMaterials = await LogRawMaterial.findAll({
                include: [{
                    model: RawMaterial,
                    include: KitchenStore
                }]
            })

            res.status(200).json({
                message: "Success read log raw materials",
                logRawMaterials
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LogRawMaterialController