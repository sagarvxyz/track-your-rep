const fetch = require('node-fetch');
const models = require('../models/models.js');

const initDbController = {};

/** 
 * Creates a MongoDB collection of representatives from ProPublica's "List of Members" endpoint: https://projects.propublica.org/api-docs/congress-api/endpoints/#members.
 * 
 * Note: this should be initialized infrequently in production - members of congress do not change that often.
*/
initDbController.loadHouseMembers = async (req, res, next) => {
  try {
    const response = await fetch('https://api.propublica.org/congress/v1/117/house/members.json', {
      headers: { 'X-API-Key': 'jwAOJEIpja83U4txD9kLUVSqAWgfHGfplWDtRvLT' }
    });
    const data = await response.json();
    members = await data.results[0].members;

    for (const member of members) {
      const doc = await new models.HouseMembers(member);
      doc.save();
    };
    return next();
  } catch (err) {
    return next({
      log: 'Error: error in initDbController.loadHouseMembers',
      message: err
    });
  };
};

module.exports = initDbController;