const express = require('express');
const initDbController = require('../controllers/initDbController');
const dataController = require('../controllers/dataController');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).end();
// })

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