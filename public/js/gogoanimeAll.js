//exports class: {title}
const allAnimes = []

function getAllList(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const subList = doc.querySelectorAll(".anime_list_body > ul.listing > li")
            return Array.from(subList).map(anime => {
                const title = anime.querySelector("a").innerText
                return {title}
            })
        })
}

const allAnimesLoaded = async function() {
    for (let i = 1; i <= 87; i++) { //87
        const prom = getAllList("https://www1.gogoanime.bid/anime-list.html?page="+i);
        allAnimes.push(prom);
    }
    return new Promise((resolve) => {
        Promise.all(allAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

export default allAnimesLoaded().then(results => {
    return results
})