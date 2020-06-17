const express = require('express');
const knex = require('knex');

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
    const { notification_type, amount, sha1_hash, datetime } = req.body;
    db('paymentlogs').insert({
        name: notification_type,
        amount: amount,
        sha1_hash: sha1_hash,
        date_time: datetime
    }).then(console.log)
    console.log(notification_type);
    res.status(200).json('working')
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on ${process.env.PORT} !`)
})
