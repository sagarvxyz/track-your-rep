const mongoose = require('mongoose');
const { Schema, SchemaType } = mongoose;
const mongoURI = 'mongodb://localhost:27017/track_your_rep';
// const mongoURI = 'mongodb://nonsensicalhttp';
mongoose.connect(mongoURI);

// To get all active members of the house, contact info, and their ProPublica IDs
const HouseMemberSchema = new Schema({
  "id": String,
  "title": String,
  "short_title": String,
  "api_uri": String,
  "first_name": String,
  "middle_name": String,
  "last_name": String,
  "suffix": String,
  "date_of_birth": Date,
  "gender": String,
  "party": String,
  "leadership_role": String,
  "twitter_account": String,
  "facebook_account": String,
  "youtube_account": String,
  "govtrack_id": String,
  "cspan_id": String,
  "votesmart_id": String,
  "icpsr_id": String,
  "crp_id": String,
  "google_entity_id": String,
  "fec_candidate_id": String,
  "url": String,
  "rss_url": String,
  "contact_form": String,
  "in_office": Boolean,
  "cook_pvi": String,
  "dw_nominate": Number,
  "ideal_point": String,
  "seniority": Number,
  "next_election": String,
  "total_votes": Number,
  "missed_votes": Number,
  "total_present": Number,
  "last_updated": Date,
  "ocd_id": String,
  "office": String,
  "phone": String,
  "fax": String,
  "state": String,
  "district": String,
  "at_large": Boolean,
  "geoid": String,
  "missed_votes_pct": Number,
  "votes_with_party_pct": Number,
  "votes_against_party_pct": Number
});
const HouseMembers = mongoose.model('houseMembers', HouseMemberSchema);

// get a house member's recent votes.
// note: currently hardcoded for one rep - AOC id: 'O000172'
const MemberVoteSchema = new Schema({
  member_id: String,
  chamber: String,
  congress: Number,
  session: Number,
  roll_call: Number,
  vot_uri: String,
  bill: Object,
  ammendment: Object,
  description: String,
  question: String,
  result: String,
  date: Date,
  time: String,
  total: Object,
  position: String
});
const MemberVotes = mongoose.model('memberVotes', MemberVoteSchema);

module.exports = {
  HouseMembers,
  MemberVotes
};