'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RawMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RawMaterial.belongsTo(models.KitchenStore, { foreignKey: "kitchen_store_id" })
      RawMaterial.hasMany(models.DrinkConcoction, { foreignKey: "raw_material_id" })
      RawMaterial.hasMany(models.LogRawMaterial, { foreignKey: "raw_material_id" })
    }
  }
  RawMaterial.init({
    quantity: DataTypes.INTEGER,
    souldOut: DataTypes.BOOLEAN,
    kitchen_store_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RawMaterial',
  });
  return RawMaterial;
};