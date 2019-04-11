const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

const reviewsProxy = proxy("http://localhost:3004")

app.use(reviewsProxy)
// app.use('/api/reviews', proxy("http://localhost:3004"))
// app.use('/api/reviews/*', proxy("http://localhost:3004"))

// app.all('/api/*', (req, res) => {
//   console.log(req.path)
//   res.redirect("http://localhost:3004" + req.path)
// })

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up on ${port}`));