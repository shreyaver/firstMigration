

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('myUsers', ['name'], {
    type: 'unique',
    name: 'unique_name',
  }).then(queryInterface.addColumn('myUsers', 'age', {
    type: Sequelize.INTEGER,
  })),
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('myUsers', 'unique_name').then(queryInterface.removeColumn('myUsers', 'age')),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

};
