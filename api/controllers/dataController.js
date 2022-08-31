const fetch = require('node-fetch');
const models = require('../models/models.js');

const dataController = {};

/**
 * Function retrieves recent votes by a representative from ProPublica's Congress API: https://projects.propublica.org/api-docs/congress-api/endpoints/#get-a-specific-members-vote-positions. 
 * 
 * 
 * DEV NOTE: memberID is currently hardcoded.
 */
dataController.getMemberVotes = async (req, res, next) => {
  console.log('getMemberVotes started');
  try {
    console.log('getMemberVotes in try block');
    const memberId = 'O000172'; // !hardcoded value for development
    const url = `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`;
    const apiKey = { 'X-API-Key': 'jwAOJEIpja83U4txD9kLUVSqAWgfHGfplWDtRvLT' };

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