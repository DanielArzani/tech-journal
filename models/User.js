// Import Model class and DataTypes object
const { Model, DataTypes } = require("sequelize");
// Create an instance of sequelize that holds database info
const sequelize = require("../config/connection");

// Create User Model
class User extends Model {}

// Define Columns and configurations
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // Prevents empty strings from being accepted
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    // Will create created_at and updated_at timestamps
    timestamps: false,
    // Will prevent sequelize from pluralising table name
    freezeTableName: true,
    // Will convert all camelCased columns to under_scored
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
