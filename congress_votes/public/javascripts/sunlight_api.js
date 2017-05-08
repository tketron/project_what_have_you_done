var request = require('request');
const baseURI = "https://congress.api.sunlightfoundation.com/";

class SunlightAPI {
  //returns 3 legislators per zipcode
  getLegislators(zipcode, callback) {
    var url = `${baseURI}legislators/locate?zip=${zipcode}`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(SunlightAPI.parseIntoLegislators(JSON.parse(body).results));
      }
    });
  }

  //returns bill_id of 20 most recently voted on items
  getRecentVotes(id, callback) {
    var url = `${baseURI}votes?&order=voted_at&voter_ids.${id}__exists==true&bill_id__exists=true&fields=bill_id,voters.${id}`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(SunlightAPI.parseIntoVotes(JSON.parse(body).results));
      }
    });
  }

  static parseIntoLegislators(parsedData) {
    var legislators = [];

    parsedData.forEach(function(dataObject) {
      var legislator = {
        bioguide_id: dataObject.bioguide_id,
        chamber: dataObject.chamber,
        first_name: dataObject.first_name,
        last_name: dataObject.last_name,
        party: dataObject.party,
        chamber: dataObject.chamber
      }
      legislators.push(legislator);
    });

    return legislators;
  }

  //BROKEN
  static parseIntoVotes(parsedData) {
    var votes = [];

    parsedData.forEach(function(dataObject) {
      var vote = {
        bill_id: dataObject.bill_id,
        // vote: dataObject.voters.stringID
      }
      votes.push(vote);
    });
    return votes;
  }
}


module.exports = SunlightAPI;
//
// const sunlight = new SunlightAPI();
// sunlight.getLegislators(94602, function(data) {
//   console.log(data);
  // data.forEach(function(legislator) {
  //   console.log(sunlight.parseIntoLegislators(legislator));

    // sunlight.getRecentVotes(legislator.bioguide_id, function(data) {
    //   data.forEach(function(vote) {
    //     console.log(vote);
    //     console.log(sunlight.parseIntoVotes(legislator.bioguide_id, vote));
    //   })
  //   // });
//   // });
// });
