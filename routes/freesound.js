var express = require('express');
var router = express.Router();
const freesoundapi = require('./freesoundapi')
const fetch = require("node-fetch");
const app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('freesound', { title: 'freesound' });
});
router.get('/play', function(req, res, next) {
    res.render('freesoundplay', { title: 'freesound' });
  });
router.post('/', (req,res) => {
    freesoundapi.search({
        keyword: req.body.keyword,
    }).then((results) => {
        res.status(200).send(results)
    })
})
router.post('/search', (req,res) => {
    freesoundapi.search({
        keyword: req.body.keyword,
        page: req.body.page
    }).then((results) => res.status(200).json(results))
})
router.post('/play', (req,res) => {
    freesoundapi.play({
        id: req.body.id
    }).then((results) => res.status(200).json(results))
})
module.exports = router;
