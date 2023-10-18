
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('module-alias/register');
require('dotenv').config();

const connectInDatabase = require('@database/connection');
connectInDatabase();

const { loginRoute, registerRoute } = require('@routes/authRoutes');

app.use(cors());
app.use(bodyParser.json());

app.listen(4080, () => {
    console.log("SERVIDOR EM: http://127.0.0.1:4080");
});

app.use('/auth', loginRoute, registerRoute);

/* Exemplo de endpoint com verificação */
//app.VERBO('/exemplo', verifyToken, (req, res) => { ... });