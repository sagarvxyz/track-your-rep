const express = require('express');
const path = require('path');

const apiRouter = require('./routes/apiRouter');
const jsonParser = express.json();
const app = express();
const port = 3000;

/* utility middleware */
app.use(jsonParser);

/* route handlers */
// production only
app.use('/dist', express.static(path.join(__dirname, '../dist')));
// app.use('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api', apiRouter); // query public apis for data

app.use('/', (req, res) => res.status(404).send('404 Error: page not found')); // catch-all route handler

/* global error handler */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error: Error caught by global error handler',
    status: 400,
    message: {err: 'An unspecified error has occured.'}
  };

  const errObj = Object.assign(defaultErr, err);
  res.status(errObj.status).send(JSON.stringify(errObj.message))
});

/* start server */
app.listen(port, () => console.log(`App listening to port ${port}!`));

module.exports = app;