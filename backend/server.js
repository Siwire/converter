const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

const originLocal = ['http://localhost:3000'];

app.use(cors({
  origin: originLocal,
  credentials: true,
}));

app.use(function (req, res, next) {
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app)

app.listen(process.env.PORT, () => {
  console.log(`Live on ${process.env.PORT}`);
});


