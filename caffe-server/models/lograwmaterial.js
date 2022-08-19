'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogRawMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LogRawMaterial.belongsTo(models.RawMaterial, { foreignKey: "raw_material_id" })
    }
  }
  LogRawMaterial.init({
    raw_material_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LogRawMaterial',
  });
  return LogRawMaterial;
};