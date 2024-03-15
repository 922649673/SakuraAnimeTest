import gogoanimeAllDataPromise from "./gogoanimeAll.js"


gogoanimeAllDataPromise.then(data => {
    var allAnimeList = []
    for (let i = 0; i < data.length; i++) {
        allAnimeList.push(data[i].title.trim())
    }
    allAnimeList.reverse()

    console.log(JSON.parse(JSON.stringify(allAnimeList)))
})