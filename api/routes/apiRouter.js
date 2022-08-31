const express = require('express');
const initDbController = require('../controllers/initDbController');
const dataController = require('../controllers/dataController');
const Server = require('webpack-dev-server');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).end();
// })

// DEV NOTE: Should separate "database" calls from API calls. The database should pull data from the external APIs on a schedule. the API routes should be used by the front-end to retrieve data from the database. Right now, external calls and "internal" calls are spliced together.
router.get('/bills', dataController.getRecentBills, dataController.serveLatestBill, (req, res) => {
  console.log('GET /bills route complete');
  res.status(200).send(res.locals.latestBill);
})

router.get('/votes', dataController.getMemberVotes, (req, res) => {
  console.log('GET /votes route complete');
  res.status(200).end();
})

// initialize database
router.get('/init', initDbController.loadHouseMembers, (req, res) => {
  console.log('database initialized');
  res.status(200).end();
})

module.exports = router;