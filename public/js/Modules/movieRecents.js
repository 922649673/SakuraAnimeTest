//exports class: {title, releaseDate, imgUrl}
import gogolink from "../gogolink.json" assert {type: "json"}

const movieAnimes = []

function getMovieRecents(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const movieList = doc.querySelectorAll(".last_episodes > ul.items > li")
            return Array.from(movieList).map(anime => {
                const title = anime.querySelector("p.name > a").innerHTML
                const releaseDate = anime.querySelector("p.released").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, releaseDate, imgUrl}
            })
        })
}

const movieAnimesLoaded = async function() {
    for (let i = 1; i <= 3; i++) {
        const prom = getMovieRecents(gogolink[0]+"anime-movies.html?aph=&page="+i);
        movieAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(movieAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default movieAnimesLoaded().then(results => {
    return results
})