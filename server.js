const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Contract, User, UserContracts } = require('./models');
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cloudinary = require('cloudinary');
const exphbs = require('express-handlebars');


const PORT = process.env.PORT || 5678;

const app = express();
const path = require('path');

app.use("/", express.static("./build/"));
app.use(bodyParser.json());


const jwtSecret = 'secret189230';


//add contract
app.post('/api/contracts', async (req, res) => {

  console.log(req.body);


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

  const newContract = await Contract.create({
    type: req.body.type,
    name: req.body.name,
    newName: req.body.newName,
    clientName: req.body.clientName,
    clientPhone: req.body.clientPhone,
    clientZipcode: req.body.clientZipcode,
    clientCity: req.body.clientCity,
    clientState: req.body.clientState,
    clientCountry: req.body.clientCountry,
    clientAddress: req.body.clientAddress,
    serviceDescription: req.body.serviceDescription,
    serviceFee: req.body.serviceFee,
    paymentConditions: req.body.paymentConditions,
    serviceDueDate: req.body.serviceDueDate,
    earlyTermination: req.body.earlyTermination,
    earlyTerminationDescription: req.body.earlyTerminationDescription,
    executionDate: req.body.executionDate,
    fileUrl: req.body.filename,
    contractStatus: req.body.contractStatus,
    fileUrl: req.body.fileUrl
    //file url = variable set above
  })
  user.addContract(newContract);
  res.status(200).json(newContract)
})

app.get('/api/contracts', async (req, res) => {
  const contracts = await Contract.findAll();
  res.json(contracts);
});


app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

//register user
app.post('/api/register', async (req, res) => {
  const { name, userEmail, username, password, userZipcode, userCity, userPhone,userState, userCountry, userAddress, birthDate } = req.body;

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

//update user info
app.put('/api/current-user', async (req, res) => {
  const { name, userEmail, password, userZipcode, userPhone,userCity, userState, userCountry,userAddress, birthDate } = req.body;

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

  if (password) {
    const passwordDigest = await bcrypt.hash(password, 12);
    user.passwordDigest = passwordDigest;
  }

  if (name) {
    user.name = name;
  }

  if (userEmail) {
    user.userEmail = userEmail;
  }

  if (userPhone) {
    user.userPhone = userPhone;
  }

  if (userZipcode) {
    user.userZipcode = userZipcode;
  }

  if (userCity) {
    user.userCity = userCity;
  }

  if (userState) {
    user.userState = userState;
  }

  if (userCountry) {
    user.userCountry = userCountry;
  }

  if (userAddress) {
    user.userAddress = userAddress;
  }

  if (birthDate) {
    user.birthDate = birthDate;
  }

  await user.save();

  res.sendStatus(200);
});

//login
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

//fetch user
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


app.get('/api/current-user/contracts', async (req, res) => {
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
  const userContracts = await Contract.findAll({
    include: [
      {
        model: User,
        where: {
          id: user.id
        },
        attributes: []
      },
    ],
  });
  res.json(userContracts);
});

app.delete('/api/current-user/contracts', async (req, res) => {
  const token = req.headers['jwt-token'];
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const { contractId } = req.body;
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });


  app.get('/api/contracts/:id', async (req, res) => {
    const id = req.params.id;
    const contract = await Contract.findOne({
      where: {
        id: id
      }
    });
    res.json(contract);
  });

  app.get('/api/contracts/:id/users', async (req, res) => {
    const id = req.params.id;
    const contractUsers = await User.findAll({
      include: [
        {
          model: Contract,
          where: {
            id: id
          }
        }
      ]
    });
    res.json(contractUsers);
  });

  app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id
      }
    });
    res.json(user);
  });


  await UserContracts.destroy({
    where: {
      $and: [
        { contractId: contractId },
        { userId: user.id },
      ]
    }
  });
  res.sendStatus(200);
});

if (process.env.NODE_ENV == "production") {
  app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});


