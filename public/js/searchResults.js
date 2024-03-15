import genreSpecific from "./genreSpecific.json" assert {type: "json"}
import allAnimeList from "./allAnimeList.json" assert {type: "json"}

if (window.location.href.includes("/searchresults/")) {

document.getElementById("displayLabel").innerText = "Search Results: " + window.location.pathname.substring(window.location.pathname.search("/searchresults/") + 15, window.location.pathname.length).toLowerCase().replace(/-/g, ' ')

function createCard(imgUrl, title, pContent, modifiedTitle) {
    var hrefDest = (location.protocol + '//' + location.host + "/SakuraAnime/streaming/" + modifiedTitle + "-episode-1")

    //add list details
    let newCard = document.createElement("li")
    newCard.setAttribute("class", "liItem")
    newCard.setAttribute("style", "background-color: rgb(35,35,35); width:158px;")
    document.querySelector("#displayItems").appendChild(newCard)
    
    //card img
    let newImgA = document.createElement("a")
    newCard.appendChild(newImgA)
    
    let img = document.createElement("img")
    img.setAttribute("src", imgUrl)
    img.setAttribute("alt", title)
    img.setAttribute("width", "158px")
    img.setAttribute("height", "230px")
    img.setAttribute("margin-left", "9px")
    img.setAttribute("margin-top", "2.25px")
    img.style.cursor = "pointer"
    newImgA.appendChild(img)

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
        window.location.href = hrefDest
    })
}

//searchResults Handler
var obtainedResults = []
var nextStartIndex = 0; //Handles the displayShowMoreBtn next starting index for obtainedResults
var numShowMoreBtnPressed = 2; //Handles the Amount of content to load based on the amount of time the displayShowMoreBtn is clicked. Starts at 2 to offset initial clickings.
const allAnimeMap = new Map(allAnimeList.map(item => [item.title, item.modifiedTitle])); //Mapping for ease of access for loop through obtainedResults to add modified title

//Acquisition of all possible contents under searched keywords [USING genreSpecific.json due to imgUrl, releaseData]
for (let i = 0; i < genreSpecific.length; i++) {
    for (let x = 1; x < genreSpecific[i].length; x++) { //Starts at 1 because 0 is the genre name
        if ((genreSpecific[i][x].title.toLowerCase().includes(window.location.pathname.substring(window.location.pathname.search("/searchresults/") + 15, window.location.pathname.length).toLowerCase().replace(/-/g, ' '))) && (!obtainedResults.some(result => result.title === genreSpecific[i][x].title))) {
            obtainedResults.push(genreSpecific[i][x])
        }
    }
}

//If less than 21 contents than hide displayShowMoreBtn and BackToTopBtn
if (obtainedResults.length < 21) {
    document.getElementById('displayShowMoreBtn').style.visibility = "hidden"
    document.getElementById('backToTop').style.visibility = "hidden"
}

// Loop through obtainedResults to add modifiedTitle to each item
for (let i = 0; i < obtainedResults.length; i++) {
    const title = obtainedResults[i].title;
    obtainedResults[i].modifiedTitle = allAnimeMap.get(title) || "Not Found";
}

//Display initial 21 contents (3-rows)
for (let i = 0; i < 21; i++) {
    if (obtainedResults[i] != null) { //Safety check
        createCard(obtainedResults[i].imgUrl, obtainedResults[i].title, obtainedResults[i].releaseDate, obtainedResults[i].modifiedTitle)
    } else {
        document.getElementById('displayShowMoreBtn').style.visibility = "hidden" //When all contents are loaded hide Btn
    }
    nextStartIndex++
}

document.getElementById('displayShowMoreBtn').addEventListener("click", function() {
    for (let i = nextStartIndex; i < 21 * numShowMoreBtnPressed; i++) {
        if (obtainedResults[i] != null) { //Safety check
            createCard(obtainedResults[i].imgUrl, obtainedResults[i].title, obtainedResults[i].releaseDate, obtainedResults[i].modifiedTitle)
        } else {
            document.getElementById('displayShowMoreBtn').style.visibility = "hidden" //When all contents are loaded hide Btn
        }
    }
    nextStartIndex = nextStartIndex + 21
    numShowMoreBtnPressed++
})

document.getElementById('backToTop').addEventListener("click", function() {
    window.scrollTo(0, 0);
})

}