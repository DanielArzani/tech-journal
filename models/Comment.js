// Import Model class and DataTypes object
const { Model, DataTypes } = require("sequelize");
// Create an instance of sequelize that holds database info
const sequelize = require("../config/connection");

// Create User Model
class Comment extends Model {}

// Define Columns and configurations
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    // Will create created_at and updated_at timestamps
    timestamps: true,
    // Will prevent sequelize from pluralising table name
    freezeTableName: true,
    // Will convert all camelCased columns to under_scored
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
