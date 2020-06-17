const express = require('express');

const app = express();

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
    const { payment } = req.body;
    db('paymentlogs').insert({
        name: payment
    }).then(console.log)
    res.status(200).json('working')
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on ${process.env.PORT} !`)
})
