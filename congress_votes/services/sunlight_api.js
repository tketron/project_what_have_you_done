var sr = require('./sunlight_requester');
var helpers = require('./sunlight_helpers');

const BASE_URL = "https://congress.api.sunlightfoundation.com/";

//SunlightApiProvider
var sunlightApiProvider = {

  //returns Promise which resolves with legislators object for a given zipcode
  getLegislators: function(zipcode) {
    var url = `${BASE_URL}legislators/locate?zip=${zipcode}`;
    return sr.sendRequest(url, helpers.parseIntoLegislators);
  },

  getRecentVotes: function(id) {
    var url = `${BASE_URL}votes?&order=voted_at&voter_ids.${id}__exists==true&bill_id__exists=true&fields=bill_id,voter_ids.${id}`;
    return sr.sendRequest(url, helpers.parseIntoVotes);
  },

  //populate an object
  getAllBillDetails: function(recentVotes, callback) {
    console.log(recentVotes);
    for (var bill in recentVotes.bill_id) {
      console.log(bill);
    }
    callback(null);
  },


  getSingleBillDetails: function(bill_id, callback) {
    var url = `${BASE_URL}bills/${bill_id}`;


    sr.sendRequest(url, function(body) {
      callback(helpers.parseIntoBill(body));
    });
  },
}

module.exports = sunlightApiProvider;
