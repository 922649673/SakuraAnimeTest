//Use this to know when to update the Genre List Large Data

import allAnimeList from "../allAnimeList.json" assert {type: "json"}

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
    console.log("Loading... wait a moment.")
    return new Promise((resolve) => {
        Promise.all(allAnimes)
        .then((res) => {
            const animes = res.flat()
            resolve(animes)
        })
    });
};

var compiledModifiedTitle = []
allAnimesLoaded().then(data => {
    console.log("Success")
    var updatedAnimeList = [...allAnimeList]; // Clone the existing list

    for (let i = 0; i < data.length; i++) {
        const found = updatedAnimeList.find(item => item.title === data[i].title);
        if (!found) {
            compiledModifiedTitle.push(data[i].modifiedTitle)
            updatedAnimeList.push(data[i]); // Add missing entries to the updated list
        }
    }
    console.log(compiledModifiedTitle)
    console.log(updatedAnimeList);
});