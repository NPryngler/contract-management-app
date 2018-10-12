// Require model file here
const { User, Contract } = require('./models');

const main = async () => {
  // Create model instances here
  const user1 = await User.create({
    name: 'Natasha Pryngler',
    username: 'npryngler',
    user_phone_number: 9172928120,
    passwordDigest: qwerty,
    email: 'natasha@pryngler.com',
    city: 'São Paulo',
    state: 'São Paulo',
    country: 'Brazil',
    address: 'Rua Purpurina, 222, 22',
    birth_date: 11/20/1981
  })

  const contract1 = await Contract.create({
    type: 'software development',
    client_email: 'client@gmail.com',
    client_phone_numbe:9172928120, 
    client_city: 'New York',
    client_state: 'New York',
    client_country: 'USA',
    client_address: '160 Riverside Boulevard',
    service_description: 'develop forms',
  service_fee: 500,
  payment_conditions: 'two installments',
  execution_date: 10/15/2018,
  service_duedate: 11/20/2018,
  early_termination: 'pro-rata payment',
  execution_date: 10/15/2018,
  })


  process.exit();
}

main();