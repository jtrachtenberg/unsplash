var express = require('express');
var router = express.Router();
const awsapi = require('./awsapi')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aws', { title: 'aws' });
});

router.post('/upload', (req,res) => {
    console.log(req.body.fileName)
    console.log(req.body.fileType)
    awsapi.sign_s3 ({fileName: req.body.fileName, fileType: req.body.fileType}).then((results) => {
      res.status(200).json(results)
    })
})
module.exports = router;