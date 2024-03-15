import allGenreSpecific from "./genreSpecific.json" assert {type: "json"}

if (window.location.href.includes("/genres/")) {

var resultedAnime = []
var ind = 0
var showMoreAmount = 2

function createCard(imgUrl, title, pContent) {
    //add list details
    let newCard = document.createElement("li")
    newCard.setAttribute("class", "liItem")
    newCard.setAttribute("style", "background-color: rgb(35,35,35); width:158px;")
    document.querySelector("#displayItems").appendChild(newCard)
    
    //card img
    let newImgA = document.createElement("a")
    newImgA.setAttribute("href", "/")
    newCard.appendChild(newImgA)
    
    let img = document.createElement("img")
    img.setAttribute("src", imgUrl)
    img.setAttribute("alt", title)
    img.setAttribute("width", "158px")
    img.setAttribute("height", "230px")
    img.setAttribute("margin-left", "9px")
    img.setAttribute("margin-top", "2.25px")
    newImgA.appendChild(img)

    //card title
    let newTitleA = document.createElement("p")
    newTitleA.setAttribute("href", "/")
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
}

for (let i = 0; i < allGenreSpecific.length; i++) {
    if (allGenreSpecific[i][0] == window.location.pathname.substring(window.location.pathname.search("/genres/") + 8, window.location.pathname.length)) {
        for (let j = 0; j < allGenreSpecific[i].length; j++) {
            if (j > 0) {
                resultedAnime.push(allGenreSpecific[i][j])
            }
        }
    }
}

for (let i = 0; i < 21; i++) {
    if (resultedAnime[i] != null) {
        createCard(resultedAnime[i].imgUrl, resultedAnime[i].title, resultedAnime[i].releaseDate)
    } else {
        document.getElementById('displayShowMoreBtn').style.visibility = "hidden"
        document.getElementById('backToTop').style.visibility = "hidden"
    }
    ind++
}

document.getElementById('displayShowMoreBtn').addEventListener("click", function() {
    for (let i = ind; i < 21 * showMoreAmount; i++) {
        if (resultedAnime[i] != null) {
            createCard(resultedAnime[i].imgUrl, resultedAnime[i].title, resultedAnime[i].releaseDate)
            document.getElementById('displayList').style.height = (933.5 * showMoreAmount).toString() + "px"
        } else {
            document.getElementById('displayShowMoreBtn').style.visibility = "hidden"
        }
    }
    ind = ind + 21
    showMoreAmount++
})

document.getElementById('backToTop').addEventListener("click", function() {
    window.scrollTo(0, 0);
})

}