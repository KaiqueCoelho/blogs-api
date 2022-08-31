const { DataTypes } = require('sequelize');

const attributes =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE
  }
};

module.exports = (sequelize) => {
  const model = sequelize.define('BlogPost', attributes, { tableName: 'BlogPosts', timestamps: false })
  model.associate = (models) => {
    model.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return model;
};