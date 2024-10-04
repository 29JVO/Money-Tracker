const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js')
const app = express()

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('Test Ok')
})

app.post('/api/transaction', (req, res) => {
    console.log(process.env.REACT_APP_MONGO_URL)
    const {name, description, datetime} = req.body;
    res.json(req.body)
})

app.listen(4040)
