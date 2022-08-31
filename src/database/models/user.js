const { DataTypes } = require('sequelize');

const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    }
  };

module.exports = (sequelize) => {
  const model = sequelize.define('User', attributes, { tableName: 'Users', timestamps: false })
  model.associate = (models) => {
    model.hasMany(models.BlogPost, { foreignKey: 'id' })
  }
  return model;
};