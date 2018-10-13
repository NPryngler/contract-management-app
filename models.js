const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'contract_management_app',
  dialect: 'postgres'
});


// Create models here
const User = sequelize.define('user', {
  name: Sequelize.TEXT,
  username: Sequelize.TEXT,
  userPhone: Sequelize.STRING,
  passwordDigest: {type: Sequelize.TEXT, unique: true },
  email: Sequelize.TEXT,
  city: Sequelize.TEXT,
  userState: Sequelize.TEXT,
  userCountry: Sequelize.TEXT,
  userAddress: Sequelize.TEXT,
  birthDate: Sequelize.TEXT
})

const Contract = sequelize.define('contract', {
  type: Sequelize.TEXT,
  client_name: Sequelize.TEXT,
  client_email: Sequelize.TEXT,
  client_phone_number: Sequelize.STRING,
  client_city: Sequelize.TEXT,
  client_state: Sequelize.TEXT,
  client_country: Sequelize.TEXT,
  client_address: Sequelize.TEXT,
  service_description: Sequelize.TEXT,
  service_fee: Sequelize.INTEGER,
  payment_conditions: Sequelize.TEXT,
  service_duedate: Sequelize.DATEONLY,
  early_termination: Sequelize.TEXT,
  execution_date: Sequelize.TEXT,
})

const UserContracts = sequelize.define('userContracts');
User.belongsToMany(Contract, { through: UserContracts});
Contract.belongsToMany(User, { through: UserContracts });

module.exports = {
  // Export models
  User,
  Contract,
  UserContracts,
  sequelize: sequelize
};
