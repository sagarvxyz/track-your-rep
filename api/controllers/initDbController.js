const fetch = require('node-fetch');
const models = require('../models/models.js');
const mongoose = require('mongoose')

const initDbController = {};

const testData = {    
  id: 'D000631',
  title: 'Representative',
  short_title: 'Rep.',
  api_uri: 'https://api.propublica.org/congress/v1/members/D000631.json',
  first_name: 'Madeleine',
  middle_name: null,
  last_name: 'Dean',
  suffix: null,
  date_of_birth: '1959-06-06',
  gender: 'F',
  party: 'D',
  leadership_role: null,
  twitter_account: 'RepDean',
  facebook_account: null,
  youtube_account: null,
  govtrack_id: '412809',
  cspan_id: null,
  votesmart_id: '136484',
  icpsr_id: null,
  crp_id: 'N00042894',
  google_entity_id: '/m/0nfwmy_',
  fec_candidate_id: 'H8PA04116',
  url: 'https://dean.house.gov',
  rss_url: null,
  contact_form: null,
  in_office: true,
  cook_pvi: null,
  dw_nominate: null,
  ideal_point: null,
  seniority: '4',
  next_election: '2022',
  total_votes: 868,
  missed_votes: 3,
  total_present: 0,
  last_updated: '2022-08-30 15:00:31 -0400',
  ocd_id: 'ocd-division/country:us/state:pa/cd:4',
  office: '120 Cannon House Office Building',
  phone: '202-225-4731',
  fax: null,
  state: 'PA',
  district: '4',
  at_large: false,
  geoid: '4204',
  missed_votes_pct: 0.35,
  votes_with_party_pct: 99.65,
  votes_against_party_pct: 0.23
}

initDbController.loadHouseMembers = async (req, res, next) => {
  console.log(models);
  try {
    const response = await fetch('https://api.propublica.org/congress/v1/117/house/members.json', {
      headers: { 'X-API-Key': 'jwAOJEIpja83U4txD9kLUVSqAWgfHGfplWDtRvLT' }
    });
    const data = await response.json();
    members = await data.results[0].members;

    for (const member of members) {
      console.log(member);
      const doc = await new models.HouseMembers(member);
      doc.save();
    };
    return next();
  } catch (err) {
    next({
      log: 'Error: error in initDbController.loadHouseMembers',
      message: err
    });
  };
};

module.exports = initDbController;