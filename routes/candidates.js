var express = require('express');
var router = express.Router();
var fs = require('fs');

fs.readFile(`${__dirname}/db.json`, 'utf8', (err, data) => {
  if (err) throw err;
  candidatesData = JSON.parse(data)

})

function save(data) {
  const json = JSON.stringify(data);
  fs.writeFile("./routes/db.json", json, function (err) {
    if (err) return console.log(err);
  });
}


router.get('/', function (req, res, next) {

  // if (req.query) {
  //   if (req.query.company) {
  //     const candidatesbyCompany = candidatesData.filter(c => c.company === req.query.company)
  //     res.json(candidatesbyCompany);
  //   } else {
  //     if (req.query.ethnicity) {
  //       const candidatesbyEthnicity = candidatesData.filter(c => c.ethnicity == req.query.ethnicity)
  //       res.json(candidatesbyEthnicity);
  //     } else {
  //       res.json(candidatesData)
  //     }
  //   }
  // } else {
  //   res.json(candidatesData)
  // }

  let candidates = candidatesData;
  const queryStringFilter = Object.keys(req.query);
  console.log({ queryStringFilter })
  if (queryStringFilter.length !== 0) {
    queryStringFilter.map(filter => {
      candidates = candidates.filter(candidate => candidate[filter] === req.query[filter])
    })
  };

  res.json(candidates);

});

router.post('/', (req, res) => {
  let candidates = candidatesData;
  const candidate = req.body;
  candidate.id = candidates.length + 1;
  candidates.push(candidate);
  save(candidates);
  res.send(candidate);
});

router.get('/:id', function (req, res, next) {
  const idx = candidatesData.findIndex(c => c.id === parseInt(req.params.id));
  let candidate = candidatesData[idx]
  if (candidate) {
    res.json(candidate)

  } else {
    res.send("Not found")
  }
});


module.exports = router;
