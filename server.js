const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Contract, User, UserContracts } = require('./models');
const PORT = process.env.PORT || 5678;

const app = express();
const path = require('path');

app.use("/", express.static("./build/"));
app.use(bodyParser.json());

const jwtSecret = 'secret189230';

app.get('/api/contracts', async (req, res) => {
  const contracts = await Contract.findAll();
  res.json(contracts);
});

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/api/register', async (req, res) => {
  const { name, email, username, password, city, userPhone, userState, userCountry, userAddress, birthDate } = req.body;

  const existingUser = await User.findOne({
    where: {
      username: username
    }
  });

  if (existingUser) {
    res.status(409).json({ message: 'This username already exists' });
    return;
  } else {
    const passwordDigest = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: name,
      email: email,
      username: username,
      passwordDigest: passwordDigest,
      city: city,
      userPhone: userPhone,
      userState: userState,
      userCountry: userCountry,
      userAddress: userAddress,
      birthDate: birthDate,
    });

    const token = jwt.sign({ userId: newUser.id }, jwtSecret);
    res.json({ token: token });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    response.status(400).json({
      error: "Login requires a username and password in the request body."
    });
    return;
  }
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (!user) {
    res.status(401).json({ message: 'Username or password invalid' });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordDigest)

  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Username or password invalid' });
  }
});

app.get('/api/current-user', async (req, res) => {
  const token = req.headers['jwt-token'];
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });
  res.json(user);
});




app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
