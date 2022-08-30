const express = require('express');
const initDbController = require('../controllers/initDbController');
const router = express.Router();

// initialize database
router.get('/', (req, res) => {
  res.status(200).send('It worked');
})
router.get('/init', initDbController.loadHouseMembers, (req, res) => {
  res.status(200).send('It worked');
})

module.exports = router;