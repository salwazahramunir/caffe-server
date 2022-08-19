'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionDetail, { foreignKey: "transaction_id" })
      Transaction.belongsTo(models.Room, { foreignKey: "room_id" })
    }
  }
  Transaction.init({
    invoice: DataTypes.STRING,
    customerName: DataTypes.STRING,
    date: DataTypes.DATE,
    totalBill: DataTypes.FLOAT,
    room_id: DataTypes.INTEGER,
    extendTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};