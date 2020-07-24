//import Unsplash from 'unsplash-js'
const toJson = require('unsplash-js').toJson
const Unsplash = require('unsplash-js').default

const unsplash = new Unsplash({accessKey: "***REMOVED***"})

module.exports = {
    search({keyword,page,perpage}) {
        console.log('api search call')
        console.log(keyword)
        return unsplash.search.photos(keyword, page, perpage).then(toJson)
    }
}