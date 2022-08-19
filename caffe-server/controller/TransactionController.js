const { Transaction, TransactionDetail, Menu, Room, RawMaterial, DrinkConcoction, LogRawMaterial } = require('../models/index')
class TransactionController {
    static async readlAllTransaction(req, res, next) {
        try {
            const transactions = await Transaction.findAll({
                include: [Room, { model: TransactionDetail, include: Menu }]
            })
    
            res.status(200).json({
                message: "Success read transactions",
                transactions
            })
        } catch (error) {
            next(error)
        }
    }

    static async createTransaction(req, res, next) {
        try {
            let { invoice, customerName, room_id, orderMenu } = req.body
            let newTransactionDetail
            let date = new Date()
            let newTransaction = await Transaction.create({ invoice, customerName, date, totalBill: 0, room_id })
            let sumTotalPrice = 0
            let roomPrice = 0
            let roomExtendTime = 0

            if (orderMenu.length !== 0) {
                for (const el of orderMenu) {
                    let { menu_id, quantity } = el
                    let menu = await Menu.findByPk(+menu_id)
                    let totalPrice = menu.price * quantity
                    newTransactionDetail = await TransactionDetail.create({ menu_id, transaction_id: newTransaction.id, quantity, totalPrice })
                    sumTotalPrice = totalPrice
                    totalPrice = 0

                    // mengurangi quantity raw materials
                    let dataResep = await DrinkConcoction.findAll({ where: { menu_id }, include: [RawMaterial, Menu] })
                    for (const resep of dataResep) {
                        let a = resep.RawMaterial.quantity - (resep.dose * quantity)
                        await RawMaterial.update({ quantity: a }, { where: { id: resep.RawMaterial.id } })
                    }
                    
                    // memasukan ke dalam log raw materials
                    for (let i = 0; i < quantity; i++) {
                        for (const resep of dataResep) {
                            await LogRawMaterial.create({ raw_material_id: resep.raw_material_id })
                        }
                    }
                }
            }
            
            if (room_id) {
                let room = await Room.findByPk(+room_id)
                roomPrice = room.price
            }

            let totalBill = newTransaction.totalBill + sumTotalPrice + roomPrice + roomExtendTime
            newTransaction = await Transaction.update({ totalBill }, { where: { id: newTransaction.id }})
            res.status(201).json({
                message: "Success create transaction",
                transaction: newTransaction,
                transactionDetails: newTransactionDetail
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = TransactionController;