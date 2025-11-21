'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ComposicaoOfertaProdutos', 'valor', {
      type: Sequelize.REAL,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ComposicaoOfertaProdutos', 'valor');
  }
};
