var request = require('request');
const baseURI = "https://congress.api.sunlightfoundation.com/";

class SunlightAPI {
  //returns 3 legislators per zipcode
  getLegislators(zipcode, callback) {
    var url = `${baseURI}legislators/locate?zip=${zipcode}`;

    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback((JSON.parse(body)).results);
      }
    });
  }

  //returns bill_id of 20 most recently voted on items
  getRecentVotes(id, callback) {
    var url = `${baseURI}votes?&order=voted_at&voter_ids.${id}__exists==true&bill_id__exists=true&fields=bill_id,voters.${id}`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(JSON.parse(body).results);
      }
    });
  }

  parseIntoLegislators(parsedData) {
    var legislator = {
      bioguide_id: parsedData.bioguide_id,
      chamber: parsedData.chamber,
      first_name: parsedData.first_name,
      last_name: parsedData.last_name
    }
    return legislator;
  }

  //BROKEN
  parseIntoVotes(legislatorID, parsedData) {
    var stringID = legislatorID.toString();
    console.log(parsedData.voters);

    var vote = {
      bill_id: parsedData.bill_id,
      vote: parsedData.voters.stringID
    }
    return vote;
  }
}

const sunlight = new SunlightAPI();
sunlight.getLegislators(94602, function(data) {
  data.forEach(function(legislator) {
    console.log(sunlight.parseIntoLegislators(legislator));

    sunlight.getRecentVotes(legislator.bioguide_id, function(data) {
      data.forEach(function(vote) {
        console.log(vote);
        console.log(sunlight.parseIntoVotes(legislator.bioguide_id, vote));
      })
    });
  });
});
