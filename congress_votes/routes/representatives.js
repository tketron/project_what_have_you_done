var express = require('express');
var router = express.Router();
var sunlight = require('../public/javascripts/sunlight_api.js');

var sunlightInstance = new sunlight();

router.post('/', function(req, res, next) {
  const zip = req.body.zipcode;
  const data = sunlightInstance.getLegislators(zip, function(data) {
    res.render('representatives', {data: data, zip: zip} );
  })

})
module.exports = router;
