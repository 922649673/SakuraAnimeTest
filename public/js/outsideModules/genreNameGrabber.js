const genreList = []
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

function getGenres(url) {
    return fetch(url)
    .then(res => res.text())
        .then(html => {
            const doc = new JSDOM(html)
            const obj = doc.window.document.querySelectorAll(".recent > .menu_series > ul > li")

            return Array.from(obj).map(gen => {
                const title = gen.querySelector("a").getAttribute("title")
                return {title}
            })
        })
}

const genreLoaded = async function() {
    const prom = getGenres("https://gogoanimehd.io/")
    genreList.push(prom);
    return new Promise((resolve) => {
        Promise.all(genreList)
        .then((res) => {
            const genres = res.flat()
            resolve(genres)
        })
    });
};

genreLoaded().then(results => {
    var finalGenreList = []
    
    for (let i = 0; i < results.length; i++) {
        //finalGenreList.push(results[i].title)
        console.log('"' + results[i].title + '"' + ",")
    }
    //console.log(finalGenreList)
})