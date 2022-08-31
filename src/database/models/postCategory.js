const { DataTypes } = require('sequelize');

const attributes =  {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
};

module.exports = (sequelize) => {
  const model = sequelize.define('PostCategory', attributes, { tableName: 'PostCategories', timestamps: false })
  model.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      through: model,
      foreignKey: 'postId',
      otherKey:'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, { 
      through: model,
      foreignKey: 'categoryId', 
      otherKey:'postId',
    });
  }
  return model;
};