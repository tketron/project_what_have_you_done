var sr = require('./sunlight_requester');
var helpers = require('./sunlight_helpers');

const BASE_URL = "https://congress.api.sunlightfoundation.com/";

//SunlightApiProvider
var sunlightApiProvider = {

  //returns Promise which resolves with legislators object for a given zipcode
  getLegislators: function(zipcode) {
    var params = {};
    params.url = `${BASE_URL}legislators/locate?zip=${zipcode}`;
    return sr.sendRequest(params, helpers.parseIntoLegislators);
  },

  getRecentVotes: function(id) {
    var params = {};
    params.id = id;
    params.url = `${BASE_URL}votes?&order=voted_at&voter_ids.${id}__exists==true&bill_id__exists=true&fields=bill_id,voter_ids.${id}`;
    return sr.sendRequest(params, helpers.parseIntoVotes);
  },

  //populate an object
  getAllBillDetails: function(recentVotes) {
    var promises = [];
    for (vote in recentVotes) {
      promises.push(this.getSingleBillDetails(vote));
      // console.log(this.getSingleBillDetails(vote));
    }

    return Promise.all(promises);
  },

  getSingleBillDetails: function(bill_id) {
    var params = {};
    params.url = `${BASE_URL}bills?${bill_id}&fields=bill_id,official_title`;
    return sr.sendRequest(params, helpers.parseIntoBill);
  }
}

module.exports = sunlightApiProvider;
