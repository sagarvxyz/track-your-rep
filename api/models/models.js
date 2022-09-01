const mongoose = require('mongoose');
const { Schema, SchemaType } = mongoose;
const mongoURI = 'mongodb://localhost:27017/track_your_rep';
mongoose.connect(mongoURI);


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
/**
 * Model for all active members of the house, contact info, and their ProPublica IDs. Built for the proPublica Congress API.
 */
const HouseMembers = mongoose.model('house_members', HouseMemberSchema);


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
/**
 * Model for representative's history of votes. Built for the proPublica Congress API. 
 */
const MemberVotes = mongoose.model('member_votes', MemberVoteSchema);

const BillSchema = new Schema({
  bill_id: String,
  bill_slug: String,
  bill_type: String,
  number: String,
  bill_uri: String,
  title: String,
  short_title: String,
  sponsor_title: String,
  sponsor_id: String,
  sponsor_name: String,
  sponsor_state: String,
  sponsor_party: String,
  sponsor_uri: String,
  gpo_pdf_uri: String,
  congressdotgov_url: String,
  govtrack_url: String,
  introduced_date: Date,
  active: Boolean,
  last_vote: Date,
  house_passage: Date,
  senate_passage: Date,
  enacted: Date,
  vetoed: Date,
  cosponsors: Number,
  cosponsors_by_party: Object,
  committees: String,
  comittee_codes: Array,
  subcomitte_codes: Array,
  primary_subject: String,
  summary: String,
  summary_short: String,
  latest_major_action_date: Date,
  latest_major_action: String
});

/**
 * Model for recent Bills. Built for the ProPublica Congress API. 
 */
const Bills = mongoose.model('bills', BillSchema);

const UserVoteSchema = new Schema({ 
  username: String,
  vote: String
});
/**
 * Model for user submitted votes.
 */
const UserVotes = mongoose.model('user_votes', UserVoteSchema);

module.exports = {
  HouseMembers,
  MemberVotes,
  Bills,
  UserVotes
};