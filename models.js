const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'contract_management_app',
  dialect: 'postgres'
});


// Create models here
const User = sequelize.define('user', {
  name: Sequelize.TEXT,
  username: Sequelize.TEXT,
  user_phone_number: Sequelize.INTEGER,
  passwordDigest: {type: Sequelize.TEXT, unique: true },
  email: Sequelize.TEXT,
  city: Sequelize.TEXT,
  state: Sequelize.TEXT,
  country: Sequelize.TEXT,
  address: Sequelize.TEXT,
  birth_date: Sequelize.TEXT
})

const Contract = sequelize.define('contract', {
  type: Sequelize.TEXT,
  client_name: Sequelize.TEXT,
  client_email: Sequelize.TEXT,
  client_phone_number: Sequelize.INTEGER,
  client_city: Sequelize.TEXT,
  client_state: Sequelize.TEXT,
  client_country: Sequelize.TEXT,
  client_address: Sequelize.TEXT,
  service_description: Sequelize.TEXT,
  service_fee: Sequelize.TEXT,
  payment_conditions: Sequelize.TEXT,
  execution_date: Sequelize.DATEONLY,
  service_duedate: Sequelize.DATEONLY,
  early_termination: Sequelize.TEXT,
  execution_date: Sequelize.TEXT,
})

const UserContracts = sequelize.define('userContracts');
User.hasMany(Contract, { through: UserContracts });
Contract.belongsTo(User, { through: UserContracts });

module.exports = {
  // Export models
  User,
  Contract,
  UserContracts,
  sequelize: sequelize
};
