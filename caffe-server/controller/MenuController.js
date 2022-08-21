const { Menu, DrinkConcoction, RawMaterial, KitchenStore } = require('../models/index')
class MenuController {
    static async readAllMenu(req, res, next) {
        try {
            const menus = await Menu.findAll({
                include: [
                    {
                        model: DrinkConcoction,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"]}
            })

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

            if (+category === 0) {
                res.status(400).json({
                    message: "Category is required"
                })
            }

            if (+isConcoction === 0 && category === "Drink") {
                res.status(400).json({
                    message: "Concoction is required"
                })
            }

            if (+isAvaiable === 0) {
                res.status(400).json({
                    message: "Avaiable is required"
                })
            }

            const newMenu = await Menu.create({ name, price, category, isConcoction, isAvaiable })

            if (category === "Drink" && isConcoction === true || isConcoction === "true" ) {
                const { recipes } = req.body
                recipes.forEach(el => {
                    const { raw_material_id, dose } = el
                    DrinkConcoction.create({ menu_id: newMenu.id, raw_material_id, dose })
                });
            }

            res.status(201).json({
                message: `Success create ${newMenu.name}`,
            })
        } catch (error) {
            next(error)
        }
    }

    static async showMenu(req, res, next) {
        try {
            const { id } = req.params

            const findMenu = await Menu.findByPk(+id, {
                include: [
                    {
                        model: DrinkConcoction,
                        include: [
                            {
                                model: RawMaterial,
                                include: [{
                                    model: KitchenStore,
                                    attributes: { exclude: ["createdAt", "updatedAt"]}
                                }],
                                attributes: { exclude: ["createdAt", "updatedAt"]}
                            }
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"]}
            })

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
            findMenu = await Menu.findByPk(+id, {
                include: [
                    {
                        model: DrinkConcoction,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"]}
            })

            if (category === "Drink" && isConcoction === true || isConcoction === "true") {
                const { recipes } = req.body
                let recipesDelete = []

                for (let i = 0; i < findMenu.dataValues.DrinkConcoctions.length; i++) {
                    const drinkConcoction = findMenu.dataValues.DrinkConcoctions[i];
                    let flag = false
                    
                    for (let j = 0; j < recipes.length; j++) {
                        const recipe = recipes[j];
                        
                        if (drinkConcoction.id === recipe.id) {
                            flag = true
                            break;
                        } else {
                            flag = false
                        }
                    }

                    if (!flag) {
                        recipesDelete.push(drinkConcoction)
                    }
                }

                recipesDelete.forEach(el => {
                    const { id } = el

                    DrinkConcoction.destroy({ where: { id } })
                })

                
                recipes.forEach(el => {
                    const { id, raw_material_id, dose } = el

                    if (!id) {
                        DrinkConcoction.create({ menu_id: findMenu.id, raw_material_id, dose })
                    } else {
                        DrinkConcoction.update({ menu_id: findMenu.id, raw_material_id, dose }, { where: { id } })
                    }
                });
            }

            res.status(201).json({
                message: `Success update ${findMenu.name}`,
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