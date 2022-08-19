const { Menu, DrinkConcoction, RawMaterial, KitchenStore } = require('../models/index')
class MenuController {
    static async readAllMenu(req, res, next) {
        try {
            const menus = await Menu.findAll({ include: DrinkConcoction })

            res.status(200).json({
                message: "Success read menus",
                menus
            })
        } catch (error) {
            next(error)
        }
    }

    static async createMenu(req, res, next) {
        try {
            const { name, price, category, isConcoction, isAvaiable } = req.body

            const newMenu = await Menu.create({ name, price, category, isConcoction, isAvaiable })

            if (category === "Drink" && isConcoction === true || isConcoction === "true" ) {
                const { recipes } = req.body
                recipes.forEach(el => {
                    const { raw_material_id, dose } = el
                    DrinkConcoction.create({ menu_id: newMenu.id, raw_material_id, dose })
                });
            }

            res.status(201).json({
                message: "Success create menu",
                menu: newMenu
            })
        } catch (error) {
            next(error)
        }
    }

    static async showMenu(req, res, next) {
        try {
            const { id } = req.params

            const findMenu = await Menu.findByPk(+id, { include: [{
                    model: DrinkConcoction,
                    include: [{ model: RawMaterial, include: KitchenStore }]
                }]})

            if (!findMenu) {
                throw { name: "NotFound" }
            }

            res.status(200).json({ 
                message: "Success show menu",
                menu: findMenu
            })      
        } catch (error) {
            next(error)
        }
    }

    static async updateMenu(req, res, next) {
        try {
            const { name, price, category, isConcoction, isAvaiable } = req.body
            const { id } = req.params

            let findMenu = await Menu.findByPk(+id)

            if (!findMenu) {
                throw { name: "NotFound" }
            }

            await Menu.update({ name, price, category, isConcoction, isAvaiable }, { where: { id }})
            findMenu = await Menu.findByPk(+id)

            if (category === "Drink" && isConcoction === true || isConcoction === "true") {
                const { recipes } = req.body
                recipes.forEach(el => {
                    const { id, raw_material_id, dose } = el
                    DrinkConcoction.update({ menu_id: findMenu.id, raw_material_id, dose }, { where: { id } })
                });
            }

            res.status(201).json({
                message: "Success update menu",
                menu: findMenu
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteMenu(req, res, next) {
        try {
            const { id } = req.params;

            const findMenu = await Menu.findByPk(+id)

            if (!findMenu) {
                throw { name: "NotFound"}
            }

            await Menu.destroy({ where: { id } })

            res.status(200).json({
                message: `Success delete ${findMenu.name}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MenuController