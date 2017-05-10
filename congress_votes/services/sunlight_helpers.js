var sunlightHelpers = {

  parseIntoLegislators: function(parsedData) {
    var legislators = {};

    parsedData.forEach(function(dataObject) { //rename dataObject to legistlators
      var legislator = {
        bioguide_id: dataObject.bioguide_id,
        chamber: dataObject.chamber,
        first_name: dataObject.first_name,
        last_name: dataObject.last_name,
        party: dataObject.party,
        chamber: dataObject.chamber
      }
      // legislators.push(legislator);
      legislators[legislator.bioguide_id] = legislator;
    });

    return legislators;
  },

  //BROKEN
  parseIntoVotes: function(parsedData, id) {
    var votes = [];
    console.log(id);
    console.log(parsedData);
    parsedData.forEach(function(dataObject) {
      // var vote_result = dataObject.voter_ids;
      // var bill_id = dataObject.bill_id;
      // var parsedBillData = SunlightAPI.getBillDetails(bill_id, function(billDetails) {
      //   callback(billDetails);
      // })

      var vote = {
        bill_id: dataObject.bill_id,
        // vote_result: dataObject.voter_ids
        legislator_vote: dataObject.voter_ids[id]
      }
      // console.log(Object.keys(vote.vote_result));
      // console.log(vote.vote_result.id);
      // console.log(vote);
      votes.push(vote);
    });
    return votes;
  }

}

module.exports = sunlightHelpers;
