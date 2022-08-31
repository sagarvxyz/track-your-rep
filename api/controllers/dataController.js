const fetch = require('node-fetch');
const models = require('../models/models.js');

const dataController = {};
const apiKey = { 'X-API-Key': 'jwAOJEIpja83U4txD9kLUVSqAWgfHGfplWDtRvLT' };

/**
 * Functino retrieves recent Bills introduced in the House of Congress. Via ProPublica Congress API: https://projects.propublica.org/api-docs/congress-api/bills/.
 * 
 * DEV NOTE: introduced bills have limited data. may want to use a different status for now?
 */
dataController.getRecentBills = async (req, res, next) => {
  try {
    const url = 'https://api.propublica.org/congress/v1/117/house/bills/introduced.json';
    const response = await fetch(url, { headers: apiKey});
    const data = await response.json();
    const bills = data.results[0].bills;

    for (const bill of bills) {
      const doc = await new models.Bills(bill);
      doc.save();
    }
 
    return next();
  } catch (err) {
    next({
      log: 'Error in dataController.getRecentBills'
    })
  }
}

/**
 * Function retrieves recent votes by a representative from ProPublica's Congress API: https://projects.propublica.org/api-docs/congress-api/endpoints/#get-a-specific-members-vote-positions. 
 * 
 * 
 * DEV NOTE: memberID is currently hardcoded.
 */
dataController.getMemberVotes = async (req, res, next) => {
  try {
    const memberId = 'O000172'; // !hardcoded value for development
    const url = `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`;
    const response = await fetch(url, { headers: apiKey });
    const data = await response.json();
    const votes = await data.results[0].votes;
    for (const vote of votes) {
      const doc = await new models.MemberVotes(vote);
      doc.save();
    };

    return next();
  } catch (err) {
    next({
      log: 'Error in dataController.getMemberVotes',
      message: err
    })
  }
};

module.exports = dataController;