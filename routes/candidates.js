var express = require('express');
var router = express.Router();

const candidatesData = require(`./db.json`)


router.get('/', function (req, res, next) {

  if (req.query) {
    if (req.query.company) {
      const candidatesbyCompany = candidatesData.filter(c => c.company === req.query.company)
      res.json(candidatesbyCompany);
    } else {
      if (req.query.ethnicity) {
        const candidatesbyEthnicity = candidatesData.filter(c => c.ethnicity == req.query.ethnicity)
        res.json(candidatesbyEthnicity);
      } else {
        res.json(candidatesData)
      }
    }
  } else {
    res.json(candidatesData)
  }

});


module.exports = router;
