const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json('home')
})

app.post('/paymentConfirmation', (req, res) => {
    console.log(req.body);
    res.status(200).json('working')
})

app.listen(4000, () => {
    console.log('server is working!')
})
