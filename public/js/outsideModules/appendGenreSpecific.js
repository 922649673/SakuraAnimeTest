import genreSpecific from "../genreSpecific.json" assert {type: "json"}
import gogolink from "../gogolink.json" assert {type: "json"}

var appendContentModifiedTitle = [
    "countdown-to-seven-days",
    "mailloui-daemoheom",
    "mask-man",
    "rebirth-of-mu-zhen-s5"
]

//Grab the genre
var animeInfo = []

function getAnimeGenre(url) {
    return fetch(url).then(res => res.text()).then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        const subList = doc.querySelectorAll("#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg")
        return Array.from(subList).map(anime => {
            const genres = anime.querySelector("p:nth-child(6)").innerText
            return {genres}
        })
    })
}

const animeInfoLoaded = async function(url) {
    const prom = getAnimeGenre(url)
    animeInfo.push(prom);
    return new Promise((resolve) => {
        Promise.all(animeInfo)
        .then((res) => {
            const AnimInfo = res.flat()
            resolve(AnimInfo)
        })
    });
};

//Grab contents to be pushed into genreSpecific.json
var animeContentInfo = []
function getAnimeContent(url) {
    return fetch(url).then(res => res.text()).then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        const title = doc.querySelector(".anime_info_body_bg > h1").innerHTML
        const releaseDate = "Released: " + doc.querySelector(".anime_info_body_bg > p:nth-child(7)").innerHTML.split("</span>")[1].trim()
        const imgUrl = doc.querySelector(".anime_info_body_bg > img").src

        return {title, releaseDate, imgUrl}
    })
}

const getAnimeContentLoaded = async function(url) {
    const prom = getAnimeContent(url)
    animeContentInfo.push(prom);
    return new Promise((resolve) => {
        Promise.all(animeContentInfo)
        .then((res) => {
            const AnimInfo = res.flat()
            resolve(AnimInfo)
        })
    });
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const promises = [];

for (let i = 0; i < appendContentModifiedTitle.length; i++) {
    const linkToScrape = gogolink[0] + "category/" + appendContentModifiedTitle[i];
    const animeInfoPromise = animeInfoLoaded(linkToScrape)
        .then(data => {
            return getAnimeContentLoaded(linkToScrape).then(data2 => {
                const cleanedGenres = data[0].genres.toLowerCase().replace("genre:", '').trim().split(', ');
                const hyphenatedGenres = cleanedGenres.map(genre => genre.replace(/\s/g, '-'));

                hyphenatedGenres.forEach(genre => {
                    const genreIndex = genreSpecific.findIndex(item => item[0] === genre);
                    if (genreIndex !== -1) {
                        console.log(genre, data2[i])
                        genreSpecific[genreIndex].push(data2[i]);
                    }
                });
            });
        });

    promises.push(animeInfoPromise);
    animeInfo = new Array();
    await sleep(2000)
}

Promise.all(promises).then(() => {
    console.log(genreSpecific);
});
