//import Unsplash from 'unsplash-js'
const toJson = require('unsplash-js').toJson
const Unsplash = require('unsplash-js').default

const unsplash = new Unsplash({accessKey: "T96xrE-u_EqE-WdvwR47aNL0QWd_CNAsZQKr6OJ0yF4"})

module.exports = {
    search({keyword,page,perpage}) {
        console.log('api search call')
        console.log(keyword)
        return unsplash.search.photos(keyword, page, perpage).then(toJson)
    }
}