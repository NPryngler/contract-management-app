const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'contract_management_app',
  dialect: 'postgres'
});


// Create models here


module.exports = {
  // Export models
  sequelize: sequelize
};
