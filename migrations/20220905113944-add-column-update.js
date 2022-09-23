'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.addColumn("users", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
