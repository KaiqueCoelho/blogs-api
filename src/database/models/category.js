const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,  
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

module.exports = (sequelize) => {
  const model = sequelize.define('Category', attributes, { tableName: 'Categories', timestamps: false })
  return model;
};