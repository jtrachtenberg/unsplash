//import Unsplash from 'unsplash-js'
const toJson = require('unsplash-js').toJson
const Unsplash = require('unsplash-js').default

const unsplash = new Unsplash({accessKey: "T96xrE-u_EqE-WdvwR47aNL0QWd_CNAsZQKr6OJ0yF4"})
const pexelAPI = "563492ad6f91700001000001a6c0fa6c901e4f748a4080172af215c5"
//https://www.pexels.com/api/documentation/

module.exports = {
    search({keyword,page,perpage}) {
        console.log('api search call')
        console.log(keyword)
        console.log(page)
        console.log(perpage)
        return unsplash.search.photos(keyword, page, perpage).then(toJson)
    },
    async endpointTrigger({id}) {
        console.log(id)
        let retVal = await new Promise((resolve, reject) => 
            unsplash.photos.getPhoto(id)
            .then(toJson)
            .then(json => {
                let dp = unsplash.photos.downloadPhoto(json)
                return resolve(dp)
            })
        )
        //console.log(retVal)
        return retVal
    }
}