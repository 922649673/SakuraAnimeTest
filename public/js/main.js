import subDataPromise from "./Modules/subRecents.js"
import dubDataPromise from "./Modules/dubRecents.js"
import chineseDataPromise from "./Modules/chineseRecents.js"
import popularDataPromise from "./Modules/popularRecents.js"
import movieDataPromise from "./Modules/movieRecents.js"
import seasonDataPromise from "./Modules/seasonRecents.js"
import gogolink from "./gogolink.json" assert {type: "json"}
import allAnimeList from "./allAnimeList.json" assert {type: "json"}

if (window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/") {

const allAnimeMap = new Map(allAnimeList.map(item => [item.title, item.modifiedTitle])); //Mapping for ease of access for loop through obtainedResults to add modified title
var currentShownList = "sub"
var subInitLoaded = false

function createCard(imgUrl, title, pContent, startAtEp1) {
    const modifiedTitle = allAnimeMap.get(title)|| "Not Found";

    var hrefDestination;

    if (!startAtEp1) {
        hrefDestination = (window.location.href + "streaming/" + modifiedTitle + "-episode-" + pContent.split("Episode ")[1])
    } else {
        hrefDestination = (window.location.href + "streaming/" + modifiedTitle + "-episode-1")
    }

    //add list details
    let newCard = document.createElement("li")
    newCard.setAttribute("class", "liItem")
    newCard.setAttribute("style", "background-color: rgb(35,35,35); width:158px;")
    document.querySelector("#items").appendChild(newCard)
    
    let img = document.createElement("img")
    img.setAttribute("src", imgUrl)
    img.setAttribute("alt", title)
    img.setAttribute("width", "158px")
    img.setAttribute("height", "230px")
    img.setAttribute("margin-left", "9px")
    img.setAttribute("margin-top", "2.25px")
    img.setAttribute("onmouseover", "this.style.cursor='pointer'")
    newCard.appendChild(img)

    //card title
    let newTitleA = document.createElement("p")
    newTitleA.setAttribute("style", "text-decoration: none; cursor: pointer;")
    newCard.appendChild(newTitleA)

    let newh4 = document.createElement("h4")
    newh4.setAttribute("style", "font-size:13px; width:158px; height:29px; overflow:hidden; font-weight:bold; text-align:center; color:#ffb7c5;")
    newh4.setAttribute("onmouseover", "this.style.color='white'")
    newh4.setAttribute("onmouseout", "this.style.color='#ffb7c5'")
    newh4.textContent = title
    newTitleA.appendChild(newh4)

    //card latestEp
    let newp = document.createElement("p")
    newp.setAttribute("style", "font-size:12px; width:158px; text-align:center; color: white;")
    newp.textContent = pContent
    newTitleA.appendChild(newp)

    newCard.addEventListener("click", function() {
        window.location.href = hrefDestination
    })
}

var manager = {
    "sub": {"ind": 0, "showMoreAmount": 2},
    "dub": {"ind": 0, "showMoreAmount": 2},
    "chinese": {"ind": 0, "showMoreAmount": 2},
    "popular": {"ind": 0, "showMoreAmount": 2},
    "movie": {"ind": 0, "showMoreAmount": 2},
    "season": {"ind": 0, "showMoreAmount": 2},
}

function resetManager() {
    for (let key in manager) {
        manager[key].ind = 0
        manager[key].showMoreAmount = 2
    }
}

function loadList(data) {
    var mult = manager[currentShownList].showMoreAmount
    for (let i = manager[currentShownList].ind; i < 14 * (mult - 1); i++) {
        if ((currentShownList != "popular") && (currentShownList != "movie") && (currentShownList != "season")) {
            createCard(data[i].imgUrl, data[i].title, data[i].latestEp)
        } else {
            createCard(data[i].imgUrl, data[i].title, data[i].releaseDate, true)
        }
        manager[currentShownList].ind++
    }
}

function listCleanUp() {
    document.querySelectorAll('.liItem').forEach(e => e.remove());
    resetManager()
    document.getElementById('showMoreIcon').setAttribute("class", "glyphicon glyphicon-chevron-down")
    document.querySelectorAll('.homeSpecificBtn').forEach(e => e.setAttribute("style", "background-color: rgb(35,35,35);"));
    document.querySelectorAll('.homeSpecificBtn').forEach(e => e.setAttribute("onmouseover", "this.style.background='rgb(50,50,50)'"))
    document.querySelectorAll('.homeSpecificBtn').forEach(e => e.setAttribute("onmouseout", "this.style.background='rgb(35,35,35)'"))
    document.getElementById('recent'+(currentShownList.charAt(0).toUpperCase()+currentShownList.slice(1)+'Btn')).setAttribute("style", "background-color: rgb(50,50,50);")
    document.getElementById('recent'+(currentShownList.charAt(0).toUpperCase()+currentShownList.slice(1)+'Btn')).setAttribute("onmouseout", "this.style.background='rgb(50,50,50)'")
}

//Feature Handler
popularDataPromise.then(data => {
    function featureLoad() {
        var random = Math.floor(Math.random() * 60)

        var animeInfo = []
        function getAnimeInfo(url) {
            return fetch(url).then(res => res.text()).then(html => {
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
            const modifiedTitle = allAnimeMap.get(data[random].title) || "Not Found";
            const prom = getAnimeInfo(gogolink[0] + "category/" + modifiedTitle)
            animeInfo.push(prom);
            return new Promise((resolve) => {
                Promise.all(animeInfo)
                .then((res) => {
                    const AnimInfo = res.flat()
                    resolve(AnimInfo)
                })
            });
        };

        animeInfoLoaded().then(content => {
            const modifiedTitle = allAnimeMap.get(data[random].title) || "Not Found";
            let hrefDestination = (location.protocol + '//' + location.host + "/SakuraAnime/streaming/" + modifiedTitle + "-episode-1")
            
            if (modifiedTitle == "Not Found") {
                hrefDestination = (window.location.href)
            }        

            document.getElementById('featuredImg').setAttribute("src", data[random].imgUrl)
            document.getElementById('featuredImg').setAttribute("alt", data[random].title)
            document.getElementById('featuredImgA').setAttribute("href", hrefDestination)
            document.getElementById('featuredT').textContent = data[random].title.substring(0, 80)
            document.getElementById('featuredT').setAttribute("href", hrefDestination)

            const summaryText = content.length > 0 && content[0]?.summary ? content[0].summary.substring(14) : data[random].title;
            const genresText = content.length > 0 && content[0]?.genres ? content[0].genres.substring(7) : "";

            document.getElementById("featuredI").textContent = summaryText
            document.getElementById("genreList").textContent = genresText
            
            if (!subInitLoaded) {
                subInitLoaded = true
                subDataPromise.then(data => { //Init Loader for fresh request
                    loadList(data, "sub")
                })
            }
        })
    }
    featureLoad()

    var pressed = false
    var canSwitch = true
    document.getElementById('featuredRight').addEventListener("click", function() {
        if (!pressed) {
            pressed = true
            canSwitch = false
            featureLoad()
            //Time out for next feature manual input
            setTimeout(function() {
                pressed = false
            }, 300)
            //Time out for next feature auto switch
            setTimeout(function() {
                canSwitch = true
            }, 5000)
        }
    })

    //Auto change feature
    function autoChangeFeature() {
        if (((window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/") === true) && canSwitch) {
            featureLoad()
            setTimeout(autoChangeFeature, 10000)
        }
    }
    setTimeout(autoChangeFeature, 10000) //Delay double load on page init
})

document.getElementById('recentSubBtn').addEventListener("click", function() {
    currentShownList = "sub"
    subDataPromise.then(data => {
        loadList(data)
    })
    listCleanUp()
})

document.getElementById('recentDubBtn').addEventListener("click", function() {
    currentShownList = "dub"
    dubDataPromise.then(data => {
        loadList(data)
    })
    listCleanUp()
})

document.getElementById('recentChineseBtn').addEventListener("click", function() {
    currentShownList = "chinese"
    chineseDataPromise.then(data => {
        loadList(data)
    })
    listCleanUp()
})

document.getElementById('recentPopularBtn').addEventListener("click", function() {
    currentShownList = "popular"
    popularDataPromise.then(data => {
        loadList(data)
    })
    listCleanUp()
})

document.getElementById('recentMovieBtn').addEventListener("click", function() {
    currentShownList = "movie"
    movieDataPromise.then(data => {
        loadList(data)
    })
    listCleanUp()
})

document.getElementById('recentSeasonBtn').addEventListener("click", function() {
    currentShownList = "season"
    seasonDataPromise.then(data => {
        loadList(data)
    })
    listCleanUp()
})

document.getElementById('GenresBtn').addEventListener("click", function() {
    location.replace("./genres")
})

function selectiveList(mode) {
    if (mode == "sub") {
        subDataPromise.then(data => {
            loadList(data)
        })
    } else if (mode == "dub") {
        dubDataPromise.then(data => {
            loadList(data)
        })
    } else if (mode == "chinese") {
        chineseDataPromise.then(data => {
            loadList(data)
        })
    } else if (mode == "popular") {
        popularDataPromise.then(data => {
            loadList(data)
        })
    } else if (mode == "movie") {
        movieDataPromise.then(data => {
            loadList(data)
        })
    } else if (mode == "season") {
        seasonDataPromise.then(data => {
            loadList(data)
        })
    }
}

document.getElementById('showMoreBtn').addEventListener("click", function() {
    if (document.getElementById('showMoreIcon').className != "glyphicon glyphicon-chevron-up") {
        if (manager[currentShownList].showMoreAmount < 5) {
            selectiveList(currentShownList)
            manager[currentShownList].showMoreAmount += 1
        }
        if (manager[currentShownList].showMoreAmount == 5) {
            document.getElementById('showMoreIcon').setAttribute("class", "glyphicon glyphicon-chevron-up")
        }
    } else {
        document.querySelectorAll('.liItem').forEach(e => e.remove());
        manager[currentShownList].showMoreAmount = 2
        manager[currentShownList].ind = 0
        selectiveList(currentShownList)
        document.getElementById('showMoreIcon').setAttribute("class", "glyphicon glyphicon-chevron-down")
        window.scrollTo(0, 0);
    }
})

}