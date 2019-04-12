const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');


const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', proxy({ 
  target: 'http://localhost:3000', 
  router: {
    '/rating': 'http://localhost:3004',
    '/reviews': 'http://localhost:3004',
    '/desc': 'http://localhost:3002'
  },
  changeOrigin: true 
}));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up on ${port}`));