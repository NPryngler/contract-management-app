const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Album, UserAlbums } = require('./models');
const PORT = process.env.PORT || 5678;

const app = express();
const path = require('path');

app.use("/", express.static("./build/"));
app.use(bodyParser.json());

const jwtSecret = 'secret189230';

app.get('/api/contracts', async (req, res) => {
  let contract = {};
  if (req.query.)
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
