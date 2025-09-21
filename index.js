const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const orderRoutes = require('./routes/order');

app.use(bodyParser.json());
app.use('/api/order', orderRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
