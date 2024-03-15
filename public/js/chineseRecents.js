//exports class: {title, latestEp, imgUrl}
const chineseAnimes = []

function getChineseRecents(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const chineseList = doc.querySelectorAll(".last_episodes > ul.items > li")
            return Array.from(chineseList).map(anime => {
                const title = anime.querySelector("p.name > a").getAttribute("title")
                const latestEp = anime.querySelector("p.episode").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, latestEp, imgUrl}
            })
        })
}

const chineseAnimesLoaded = async function() {
    for (let i = 1; i <= 3; i++) {
        const prom = getChineseRecents("https://ajax.gogo-load.com/ajax/page-recent-release.html?page="+i+"&type=3");
        chineseAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(chineseAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default chineseAnimesLoaded().then(results => {
    return results
})