//exports class: {title, modifiedTitle}
const allAnimes = []

function getAllList(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const subList = doc.querySelectorAll(".anime_list_body > ul.listing > li")
            return Array.from(subList).map(anime => {
                const anchorElement = anime.querySelector("a")
                const title = anchorElement.innerText
                const modifiedTitle = anchorElement.href.split("/category/")[1]
                console.log(title)
                return {"title": title, "modifiedTitle": modifiedTitle}
            })
        })
}

const allAnimesLoaded = async function() {
    for (let i = 1; i <= 95; i++) { //95
        const prom = getAllList("https://gogoanimehd.io/anime-list.html?page="+i);
        allAnimes.push(prom);
        console.log(i)
    }
    return new Promise((resolve) => {
        Promise.all(allAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

allAnimesLoaded().then(data => {
    console.log("Success")
    var allAnimeList = []
    for (let i = 0; i < data.length; i++) {
        allAnimeList.push(data[i])
    }
    allAnimeList.reverse()

    console.log(JSON.parse(JSON.stringify(allAnimeList)))
})
