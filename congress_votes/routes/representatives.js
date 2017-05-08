var express = require('express');
var router = express.Router();
var sunlight = require('../public/javascripts/sunlight_api.js');

var sunlightInstance = new sunlight();

router.post('/', function(req, res, next) {
  const zip = req.body.zipcode;
  var data = sunlightInstance.getLegislators(zip, function(data) {
    res.render('representatives', {data: data, zip: zip} );
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  var votes = sunlightInstance.getRecentVotes(id, function(votes){
    res.render('record', {id: id, votes: votes});
  });
});


module.exports = router;
