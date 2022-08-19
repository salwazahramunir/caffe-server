'use strict';
const {
  Model
} = require('sequelize');
const { hashPasswod } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "user_id" })
    }
  }
  User.init({
    username: {
      unique: {
        msg: "username already exists"
      },
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "username is required"
        },
        notEmpty: {
          msg: "username is required"
        }
      }
    },
    email: {
      unique: {
        msg: "e-mail already registered"
      },
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "e-mail is required"
        },
        notEmpty: {
          msg: "e-mail is required"
        },
        isEmail: {
          msg: "e-mail must be in email format"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "password is required"
        },
        notEmpty: {
          msg: "password is required"
        }
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "role is required"
        },
        notEmpty: {
          msg: "role is required"
        }
      }
    } 
  }, {
    hooks: {
      beforeCreate(instance, option) {
        instance.password = hashPasswod(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};