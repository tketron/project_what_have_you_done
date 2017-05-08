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

  //returns roll_id of 20 most recently voted on items
  getRecentVotes(id, callback) {
    var url = `${baseURI}votes?&order=voted_at&voter_ids.${id}__exists==true&fields=roll_id`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(JSON.parse(body));
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

}

const sunlight = new SunlightAPI();
sunlight.getLegislators(94602, function(data) {
  data.forEach(function(legislator) {
    console.log(sunlight.parseIntoLegislators(legislator));
    console.log(sunlight.getRecentVotes(legislator.bioguide_id, function(ID) {
      console.log(ID);
    }))
  });
});
// sunlight.getRecentVotes(function(data) {
//   console.log(data);
// });
