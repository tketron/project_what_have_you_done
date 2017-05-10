var request = require('request');
var helpers = require('./sunlight_helpers');
const baseURI = "https://congress.api.sunlightfoundation.com/";

//SunlightApiProvider
var sunlightApiProvider = {

  //returns 3 legislators per zipcode
  getLegislators: function(zipcode, callback) {
    var url = `${baseURI}legislators/locate?zip=${zipcode}`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(helpers.parseIntoLegislators(JSON.parse(body).results));
      }
    });
  },

  //returns bill_id of 20 most recently voted on items
  getRecentVotes: function(id, callback) {
    var url = `${baseURI}votes?&order=voted_at&voter_ids.${id}__exists==true&bill_id__exists=true&fields=bill_id,voter_ids.${id}`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(helpers.parseIntoVotes(JSON.parse(body).results, id));
      }
    });
  },

  getBillDetails: function(bill_id, callback) {
    var url = `${baseURI}bills/${bill_id}`;
    request(url, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(JSON.parse(body).results);
      }
    });
  }
}

module.exports = sunlightApiProvider;

// class SunlightAPI {
//   //returns 3 legislators per zipcode
//   getLegislators(zipcode, callback) {
//     var url = `${baseURI}legislators/locate?zip=${zipcode}`;
//     request(url, function(error, response, body) {
//       if (!error & response.statusCode == 200) {
//         callback(SunlightAPI.parseIntoLegislators(JSON.parse(body).results));
//       }
//     });
//   }
//
//   //returns bill_id of 20 most recently voted on items
//   getRecentVotes(id, callback) {
//     var url = `${baseURI}votes?&order=voted_at&voter_ids.${id}__exists==true&bill_id__exists=true&fields=bill_id,voter_ids.${id}`;
//     request(url, function(error, response, body) {
//       if (!error & response.statusCode == 200) {
//         callback(SunlightAPI.parseIntoVotes(JSON.parse(body).results, id));
//       }
//     });
//   }
//
//   getBillDetails(bill_id, callback) {
//     var url = `${baseURI}bills/${bill_id}`;
//     request(url, function(error, response, body) {
//       if (!error & response.statusCode == 200) {
//         callback(JSON.parse(body).results);
//       }
//     });
//   }
//
//   static parseIntoLegislators(parsedData) {
//     var legislators = {};
//
//     parsedData.forEach(function(dataObject) { //rename dataObject to legistlators
//       var legislator = {
//         bioguide_id: dataObject.bioguide_id,
//         chamber: dataObject.chamber,
//         first_name: dataObject.first_name,
//         last_name: dataObject.last_name,
//         party: dataObject.party,
//         chamber: dataObject.chamber
//       }
//       // legislators.push(legislator);
//       legislators[legislator.bioguide_id] = legislator;
//     });
//
//     return legislators;
//   }
//
//   //BROKEN
//   static parseIntoVotes(parsedData, id) {
//     var votes = [];
//     console.log(id);
//     console.log(parsedData);
//     parsedData.forEach(function(dataObject) {
//       // var vote_result = dataObject.voter_ids;
//       // var bill_id = dataObject.bill_id;
//       // var parsedBillData = SunlightAPI.getBillDetails(bill_id, function(billDetails) {
//       //   callback(billDetails);
//       // })
//
//       var vote = {
//         bill_id: dataObject.bill_id,
//         // vote_result: dataObject.voter_ids
//         legislator_vote: dataObject.voter_ids[id]
//       }
//       // console.log(Object.keys(vote.vote_result));
//       // console.log(vote.vote_result.id);
//       // console.log(vote);
//       votes.push(vote);
//     });
//     return votes;
//   }
// }
//
//
// module.exports = SunlightAPI;
// //
// // const sunlight = new SunlightAPI();
// // sunlight.getLegislators(94602, function(data) {
// //   console.log(data);
//   // data.forEach(function(legislator) {
//   //   console.log(sunlight.parseIntoLegislators(legislator));
//
//     // sunlight.getRecentVotes(legislator.bioguide_id, function(data) {
//     //   data.forEach(function(vote) {
//     //     console.log(vote);
//     //     console.log(sunlight.parseIntoVotes(legislator.bioguide_id, vote));
//     //   })
//   //   // });
// //   // });
// // });
