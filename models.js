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
  clientName: Sequelize.TEXT,
  clientEmail: Sequelize.TEXT,
  clientPhone: Sequelize.STRING,
  clientCity: Sequelize.TEXT,
  clientState: Sequelize.TEXT,
  clientCountry: Sequelize.TEXT,
  clientAddress: Sequelize.TEXT,
  serviceDescription: Sequelize.TEXT,
  serviceFee: Sequelize.INTEGER,
  paymentConditions: Sequelize.TEXT,
  serviceDuedate: Sequelize.DATEONLY,
  earlyTermination: Sequelize.TEXT,
  executionDate: Sequelize.TEXT,
  filePath: Sequelize.STRING 
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
