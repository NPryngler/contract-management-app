const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/contract_management_app', {
  dialect: 'postgres'
});


// Create models here
const User = sequelize.define('user', {
  name: Sequelize.TEXT,
  username: Sequelize.TEXT,
  userPhone: Sequelize.STRING,
  passwordDigest: {type: Sequelize.TEXT, unique: true },
  userEmail: Sequelize.TEXT,
  userZipcode: Sequelize.STRING,
  userCity: Sequelize.TEXT,
  userState: Sequelize.TEXT,
  userCountry: Sequelize.TEXT,
  userAddress: Sequelize.TEXT,
  birthDate: Sequelize.TEXT
})

const Contract = sequelize.define('contract', {
  type: Sequelize.TEXT,
  name: Sequelize.TEXT,
  newName: Sequelize.TEXT,
  clientName: Sequelize.TEXT,
  clientEmail: Sequelize.STRING,
  clientPhone: Sequelize.STRING,
  clientZipcode: Sequelize.STRING,
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
  contractStatus: Sequelize.TEXT,
  // file: Sequelize.BLOB,
  pdfUrl: Sequelize.STRING 
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
