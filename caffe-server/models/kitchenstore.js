'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KitchenStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KitchenStore.hasMany(models.RawMaterial, { foreignKey: "kitchen_store_id" })
    }
  }
  KitchenStore.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "name is required"
        },
        notEmpty: {
          msg: "name is required"
        }
      }
    }, 
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "quantity is required"
        },
        notEmpty: {
          msg: "quantity is required"
        },
        min: {
          args: [0],
          msg: "minimum quantity is 0"
        }
      }
    },
    unit: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "unit is required"
        },
        notEmpty: {
          msg: "unit is required"
        }
      }
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "stock is required"
        },
        notEmpty: {
          msg: "stock is required"
        },
        min: {
          args: [0],
          msg: "minimum stock is 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'KitchenStore',
  });
  return KitchenStore;
};