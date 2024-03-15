//exports class: {title, releaseDate, imgUrl}
import gogolink from "../gogolink.json" assert {type: "json"}

const popularAnimes = []

function getPopularRecents(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const popularList = doc.querySelectorAll(".last_episodes > ul.items > li")
            return Array.from(popularList).map(anime => {
                const title = anime.querySelector("p.name > a").innerHTML
                const releaseDate = anime.querySelector("p.released").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, releaseDate, imgUrl}
            })
        })
}

const popularAnimesLoaded = async function() {
    for (let i = 1; i <= 3; i++) {
        const prom = getPopularRecents(gogolink[0]+"popular.html?page="+i);
        popularAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(popularAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default popularAnimesLoaded().then(results => {
    return results
})