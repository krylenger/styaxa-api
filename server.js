const express = require('express');
const knex = require('knex');
const SHA1 = require("crypto-js/sha1");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

app.get('/', (req, res) => {
    res.json('home')
})

app.post('/paymentConfirmation', (req, res) => {
    const { notification_type, operation_id, amount, currency, datetime, sender, codepro, label, sha1_hash } = req.body;
    let queryString = `${notification_type}&${operation_id}&${amount}&${currency}&${datetime}&${sender}&${codepro}&TnRBii6WbYjljn5Lw8QF1uQ1&${label}`;
    
    db('paymentlogs').insert({
        name: SHA1(queryString).toString(),
        sha1_hash: sha1_hash,
        date_time: datetime
    }).then(console.log)
    console.log(req.body);
    res.status(200).json('working')
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on ${process.env.PORT} !`)
})
