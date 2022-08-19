'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.DrinkConcoction, { foreignKey: "menu_id" })
      Menu.hasMany(models.TransactionDetail, { foreignKey: "menu_id" })
    }
  }
  Menu.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    isConcoction: DataTypes.BOOLEAN,
    isAvaiable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};