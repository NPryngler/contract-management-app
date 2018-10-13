// Require model file here
const { User, Contract, UserContracts } = require('./models');

const main = async () => {
  // Create model instances here
  const user1 = await User.create({
    name: 'Natasha Pryngler',
    username: 'npryngler',
    user_phone_number: 9172928120,
    passwordDigest: 'qwerty',
    email: 'natasha@pryngler.com',
    city: 'São Paulo',
    state: 'São Paulo',
    country: 'Brazil',
    address: 'Rua Purpurina, 222, 22',
    birth_date: "1981-11-20"
  })

  const contract1 = await Contract.create({
    type: 'software development',
    client_email: 'client@gmail.com',
    client_phone_number: 9172928120,
    client_city: 'New York',
    client_state: 'New York',
    client_country: 'USA',
    client_address: '160 Riverside Boulevard',
    service_description: 'develop forms',
    service_fee: 500,
    payment_conditions: 'two installments',
    service_duedate: "2018-11-20",
    early_termination: 'pro-rata payment',
    execution_date: "2018-10-20",
  })

  // await user1.AddContract(contract1);

  process.exit();
}

main();