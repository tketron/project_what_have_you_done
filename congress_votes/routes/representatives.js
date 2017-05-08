var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.send("routing correct");
//   const zip = req.query.zipcode;
//   res.send(zip);
// });

router.post('/', function(req, res, next) {
  const zip = req.body.zipcode;
  res.render('representatives', {zip: zip});l
})
module.exports = router;
