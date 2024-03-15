//exports class: {title, latestEp, imgUrl}
const subAnimes = []

function getSubRecents(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const subList = doc.querySelectorAll(".last_episodes > ul.items > li")
            return Array.from(subList).map(anime => {
                const title = anime.querySelector("p.name > a").innerHTML
                const latestEp = anime.querySelector("p.episode").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, latestEp, imgUrl}
            })
        })
}

const subAnimesLoaded = async function() {
    for (let i = 1; i <= 3; i++) {
        const prom = getSubRecents("https://ajax.gogocdn.net/ajax/page-recent-release.html?page="+i+"&type=1");
        subAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(subAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default subAnimesLoaded().then(results => {
    return results
})