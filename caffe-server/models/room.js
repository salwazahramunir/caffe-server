'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Transaction, { foreignKey: "room_id" })
    }
  }
  Room.init({
    codeRoom: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "code room is required"
        },
        notEmpty: {
          msg: "code room is required"
        }
      }
    },
    nameRoom: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "name room is required"
        },
        notEmpty: {
          msg: "name room is required"
        }
      }
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "category is required"
        },
        notEmpty: {
          msg: "category is required"
        }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        notNull: {
          msg: "price is required"
        },
        notEmpty: {
          msg: "price is required"
        },
        min: {
          args: [1],
          msg: "price must be above 0"
        }
      }
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "duration is required"
        },
        notEmpty: {
          msg: "duration is required"
        },
        min: {
          args: [60],
          msg: "minimum duration is 60 minutes"
        }
      }
    },
    isEmpty: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: {
          msg: "isEmpty is required"
        },
        notEmpty: {
          msg: "isEmpty is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  
  return Room;
};