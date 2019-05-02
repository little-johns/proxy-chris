const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('newrelic');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use('/:stockId', express.static(path.join(__dirname, './public')));

const chartReq = axios.create({
  baseURL: 'http://localhost:4000/'
});

app.get('/api/:stockId', (req, res) => {
  chartReq.get(`api/${req.params.stockId}`)
  .then((response) => {
    res.send(response.data);
  })
})

// const buyFormReq = axios.create({
//     baseURL: 'http://ec2-3-84-115-167.compute-1.amazonaws.com:8080/' 
// });

// app.get('/stocks/:query', (req, res) => {
//     buyFormReq.get(`stocks/${req.params.query}`)
//     .then((response) => {
//         res.send(response.data);
//     })
// })

app.listen(port, () => {
    console.log('Server is listening on port', port);
});

