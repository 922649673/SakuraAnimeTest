//exports class: {title, releaseDate, imgUrl}
import gogolink from "../gogolink.json" assert {type: "json"}

const seasonalAnimes = []

function getSeasonRecents(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const seasonalList = doc.querySelectorAll(".last_episodes > ul.items > li")
            return Array.from(seasonalList).map(anime => {
                const title = anime.querySelector("p.name > a").innerHTML
                const releaseDate = anime.querySelector("p.released").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, releaseDate, imgUrl}
            })
        })
}

const seasonalAnimesLoaded = async function() {
    for (let i = 1; i <= 3; i++) {
        const prom = getSeasonRecents(gogolink[0]+"new-season.html?page="+i);
        seasonalAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(seasonalAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default seasonalAnimesLoaded().then(results => {
    return results
})