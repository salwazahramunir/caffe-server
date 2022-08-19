'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Menu, { foreignKey: "menu_id" })
      TransactionDetail.belongsTo(models.Transaction, { foreignKey: "transaction_id" })
    }
  }
  TransactionDetail.init({
    menu_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};