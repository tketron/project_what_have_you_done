var express = require('express');
var router = express.Router();

var sunlight = require('../services/sunlight_api.js');

router.post('/', function(req, res, next) {
  var templateData = {};
  templateData.zip = req.body.zipcode;
  sunlight.getLegislators(templateData.zip)
    .then(function(legislatorData) {
      templateData.legislatorData = legislatorData;
      res.render('representatives', {legislators: templateData.legislatorData, zip: templateData.zip} );
    }).catch(console.error);
});

router.get('/:id', function(req, res, next) {
  var templateData = {};
  templateData.bioguide_id = req.params.id;
  sunlight.getRecentVotes(templateData.bioguide_id)
    .then(function(voteData) {
      templateData.voteData = voteData;
      sunlight.getAllBillDetails(templateData.voteData)
      .then(function(billData) {
        templateData.billData = billData;
        console.log(billData);
        res.render('record', {id: templateData.bioguide_id, votes: templateData.voteData, bills: templateData.billData});
      });
    }).catch(console.error);
});

module.exports = router;
