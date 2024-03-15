//exports class: {title, latestEp, imgUrl}
const dubAnimes = []

function getDubRecents(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const dubList = doc.querySelectorAll(".last_episodes > ul.items > li")
            return Array.from(dubList).map(anime => {
                const title = anime.querySelector("p.name > a").getAttribute("title")
                const latestEp = anime.querySelector("p.episode").innerText
                const imgUrl = anime.querySelector("div.img > a > img").src
                return {title, latestEp, imgUrl}
            })
        })
}

const dubAnimesLoaded = async function() {
    for (let i = 1; i <= 3; i++) {
        const prom = getDubRecents("https://ajax.gogocdn.net/ajax/page-recent-release.html?page="+i+"&type=2");
        dubAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(dubAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default dubAnimesLoaded().then(results => {
    return results
})