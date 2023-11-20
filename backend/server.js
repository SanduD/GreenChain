//mongodb

require('./config/db');

const app = require('express')();
const port = 5000;

//accepting post from data
const bodyParser = require('express').json;
app.use(bodyParser());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
