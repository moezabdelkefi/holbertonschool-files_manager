const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
