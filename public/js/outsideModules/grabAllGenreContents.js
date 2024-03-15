//Use for updating genreSpecific.json
import allGenres from "../allGenres.json" assert {type: "json"}
import gogolink from "../gogolink.json" assert {type: "json"}
//In case not work move back down and replace .. with .
var genreAnimes = []
var finalObtained = []
var obtainedAnimes = []

var finished = false

function getGenreAnimes(url) {
    console.log(url)
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const genreList = doc.querySelectorAll(".last_episodes > ul.items > li")
            if (genreList.length == 20) {
                var pageIndex = []
                var currentIndex = parseInt(doc.querySelector(".anime_name_pagination > .pagination > .pagination-list > li.selected > a").getAttribute("data-page"))
                doc.querySelectorAll(".anime_name_pagination > .pagination > .pagination-list > li").forEach((el) => {
                    pageIndex.push(parseInt(el.querySelector("a").getAttribute("data-page")))
                })
                if (!pageIndex.includes(currentIndex + 1)) {
                    finished = true
                }
            } else {
                finished = true
            }
            return Array.from(genreList).map(anime => {
                const title = anime.querySelector("p.name > a").getAttribute("title").replaceAll('"', '\\"') // "" error varieties
                const releaseDate = anime.querySelector("p.released").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, releaseDate, imgUrl}
            })
        })
}

const genreAnimesLoaded = async function(url) {
    const prom = getGenreAnimes(url);
    genreAnimes.push(prom);
    return new Promise((resolve) => {
        Promise.all(genreAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

var ind = 1
var canContinue = true
function loopGet(index, currentGenre, init) {
    if (init) {
        ind = index
    }
    console.log(ind + " | " + currentGenre)
    canContinue = false
    if (!finished) {
        genreAnimesLoaded(gogolink[0]+"genre/"+currentGenre+"?page="+ind).then(results => {
            obtainedAnimes.push(currentGenre)
            for (let x = 0; x < results.length; x++) {
                obtainedAnimes.push(results[x])
            }
            finalObtained.push(obtainedAnimes)
            obtainedAnimes = []
            genreAnimes = []
            ind++
            loopGet(ind, currentGenre, false)
        })
    } else {
        finished = false
        obtainedAnimes = []
        genreAnimes = []
        ind = 1
        canContinue = true
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

for (let i = 0; i < allGenres.length; i++) {
    loopGet(1, allGenres[i].trim().toLowerCase().replace(/\s/g, "-"), true)
    while (true) {
        if (canContinue) {
            break
        }
        await sleep(200)
    }
}

console.log(finalObtained)