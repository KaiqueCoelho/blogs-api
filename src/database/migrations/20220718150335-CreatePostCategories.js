'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('PostCategories', {
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostCategories');
  }
};
