var express = require('express');
var router = express.Router();
const unsplashapi = require('./unsplashapi')
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('unsplash', { title: 'Unsplash' });
});
router.post('/', (req,res) => {
    unsplashapi.search({
        keyword: req.body.keyword,
        page: 1,
        perpage: 10
    }).then((results) => {
        console.log(results)
        //console.log(res.json(results))
        res.status(200).send(results)
    })
})
router.post('/search', (req,res) => {
    unsplashapi.search({
        keyword: req.body.keyword,
        page: req.body.page,
        perpage: req.body.perpage
    }).then((results) => res.status(200).json(results))
})
module.exports = router;
