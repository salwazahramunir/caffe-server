'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DrinkConcoction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DrinkConcoction.belongsTo(models.RawMaterial, { foreignKey: "raw_material_id" })
      DrinkConcoction.belongsTo(models.Menu, { foreignKey: "menu_id" })
    }
  }
  DrinkConcoction.init({
    menu_id: DataTypes.INTEGER,
    raw_material_id: DataTypes.INTEGER,
    dose: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DrinkConcoction',
  });
  return DrinkConcoction;
};