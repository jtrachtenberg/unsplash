//const Freesound = require('./freesoundmod')
const token = "***REMOVED***"
const authHeader = `Token ${token}`
const host = "https://freesound.org"
const searchHost = `https://freesound.org/apiv2/search/text/?token=${token}&format=json&fields=id,name,description,previews,url,username&query=`
const playHost = host+'/apiv2/sounds/'

module.exports = {
    async search({keyword, page}) {
        page = page||1
        console.log('freesoundapi search call')
        console.log(keyword)
        var retVal
        const url = searchHost+keyword+'&page='+page
        console.log(url)
        console.log(url)
        await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(response => response.json())
                .then(data => {
                    console.log('!!!!!')
                    retVal = new Promise((resolve, reject) => resolve(data))
                })
                .catch(error => {
                    console.log('error')
                    retVal = new Promise((resolve) => resolve(error))
                });

        return retVal
    },
    async play ({id}) {
        const url = playHost + id + '/?fields=id,name,description,previews,url,username&format=json&' + `token=${token}`
        let retVal
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
        .then(data => {
            retVal = new Promise((resolve, reject) => resolve(data))
        })
        .catch(error => {
            retVal = new Promise((resolve) => resolve(error))
        });

        return retVal
    }
}
