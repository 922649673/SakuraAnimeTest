import popularDataPromise from "./popularRecents.js"

if (window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/") {

//Messy :skull:
popularDataPromise.then(data => {
    var canLoadImg = false

    function featureLoad() {
        var random = Math.floor(Math.random() * 60)

        function repeatWait() {
            if (canLoadImg === false) {
                setTimeout(repeatWait, 10)
            } else {
                document.getElementById('featuredImg').setAttribute("src", data[random].imgUrl)
                document.getElementById('featuredImg').setAttribute("alt", data[random].title)
                document.getElementById('featuredT').textContent = data[random].title.substring(0, 80)
                canLoadImg = false
            }
        }
        repeatWait()

        const animeSearched = []
        function getAnimeSearch(url) {
            return fetch(url)
            .then(res => res.text())
                .then(html => {
                    const doc = new DOMParser().parseFromString(html, "text/html")
                    const subList = doc.querySelectorAll("#wrapper_bg > section > section.content_left > div > div.last_episodes > ul > li:nth-child(1)")
                    return Array.from(subList).map(anime => {
                        const animeSearched = anime.querySelector("div.img > a").href
                        return {animeSearched}
                    })
                })
        }

        const getAnimeSearchLoaded = async function() {
            const prom = getAnimeSearch("https://www1.gogoanime.bid/search.html?keyword="+data[random].title)
            animeSearched.push(prom);
            return new Promise((resolve) => {
                Promise.all(animeSearched)
                .then((res) => {
                    const AnimInfo = res.flat()
                    resolve(AnimInfo)
                })
            });
        };

        getAnimeSearchLoaded().then(d => {
            var newUrl = new URL(d[0].animeSearched)
            newUrl = "https://www1.gogoanime.bid" + newUrl.toString().replace(newUrl.origin, "")

            var animeInfo = []
            function getAnimeInfo(url) {
                return fetch(url)
                .then(res => res.text())
                    .then(html => {
                        const doc = new DOMParser().parseFromString(html, "text/html")
                        const subList = doc.querySelectorAll("#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg")
                        return Array.from(subList).map(anime => {
                            const summary = anime.querySelector("p:nth-child(5)").innerText
                            const genres = anime.querySelector("p:nth-child(6)").innerText
                            return {summary, genres}
                        })
                    })
            }
            
            const animeInfoLoaded = async function() {
                const prom = getAnimeInfo(newUrl)
                animeInfo.push(prom);
                return new Promise((resolve) => {
                    Promise.all(animeInfo)
                    .then((res) => {
                        const AnimInfo = res.flat()
                        resolve(AnimInfo)
                    })
                });
            };

            animeInfoLoaded().then(data => {
                document.getElementById("featuredI").textContent = data[0].summary.substring(14)
                document.getElementById("genreList").textContent = data[0].genres.substring(7)
                canLoadImg = true
            })
        })
    }
    featureLoad()

    var pressed = false
    document.getElementById('featuredRight').addEventListener("click", function() {
        if (!pressed) {
            pressed = true
            featureLoad()
            setTimeout(function() {
                pressed = false
            }, 500)
        }
    })

    //Auto change feature
    function autoChangeFeature() {
        if ((window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/") === true) {
            featureLoad()
            setTimeout(autoChangeFeature, 10000)
        }
    }
    autoChangeFeature()
    
    /*
    console.log(window.location.href)
    console.log(location.protocol + '//' + location.host + "/SakuraAnime/")
    console.log(window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/")*/
})

}