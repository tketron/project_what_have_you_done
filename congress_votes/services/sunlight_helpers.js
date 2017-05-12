var sunlightHelpers = {

  //parse JSON data into a legislator object, using bioguide_id field as keys
  parseIntoLegislators: function(parsedData) {
    var legislators = {};

    parsedData.forEach(function(dataObject) {
      var legislator = {
        bioguide_id: dataObject.bioguide_id,
        chamber: dataObject.chamber,
        first_name: dataObject.first_name,
        last_name: dataObject.last_name,
        party: dataObject.party,
        chamber: dataObject.chamber
      }
      legislators[legislator.bioguide_id] = legislator;
    });

    return legislators;
  },

  parseIntoVotes: function(parsedData, id) {
    var votes = {};
    parsedData.forEach(function(dataObject) {
      var vote = {
        bill_id: dataObject.bill_id,
        legislator_vote: dataObject.voter_ids[id]
      }
      votes[vote.bill_id] = vote;
    });
    return votes;
  },

  parseIntoBill: function(parsedData) {

  }

}

module.exports = sunlightHelpers;
