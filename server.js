const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5678;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
