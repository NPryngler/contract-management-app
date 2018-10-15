// Require model file here
const { User, Contract, UserContracts } = require('./models');

const main = async () => {
  // Create model instances here
  const user1 = await User.create({
    name: 'Natasha Pryngler',
    username: 'npryngler',
    userPhone: 9172928120,
    passwordDigest: '$2a$12$58wpxQiElq9kH4cD7eB8beTmbnODPVpYCa5HeaCHPHNmWUr06oXzS',
    userEmail: 'natasha@pryngler.com',
    userZipCode: '00000',
    userCity: 'São Paulo',
    userState: 'São Paulo',
    userCountry: 'Brazil',
    userAddress: 'Rua Purpurina, 222, 22',
    birthDate: "1981-11-20"
  })

  const contract1 = await Contract.create({
    type: 'software development',
    clientName: 'Maria Madalena',
    clientEmail: 'client@gmail.com',
    clientPhone: 9172928120,
    clientCity: 'New York',
    clientState: 'New York',
    clientCountry: 'USA',
    clientAddress: '160 Riverside Boulevard',
    serviceDescription: 'develop forms',
    serviceFee: 500,
    paymentConditions: 'two installments',
    serviceDuedate: "2018-11-20",
    earlyTermination: 'pro-rata payment',
    executionDate: "2018-10-20",
    contractFile: "",
  })

  await user1.addContract(contract1);

  process.exit();
}

main();