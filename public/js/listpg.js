import allAnimeList from "./allAnimeList.json" assert {type: "json"}

if (window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/listpg") {

var currentLetter = "a"
var subDubType = "any"

function createCard(title, dub, hrefDest) {
    hrefDest = (location.protocol + '//' + location.host + "/SakuraAnime/streaming/" + hrefDest + "-episode-1")
    
    //add list details
    let newItem = document.createElement("div")
    newItem.setAttribute("class", "listItem")
    newItem.setAttribute("style", "font-size: 13px; font-weight: bold; overflow: hidden;")
    document.querySelector(".listHolder").appendChild(newItem)
    
    let newItemA = document.createElement("a")
    newItemA.setAttribute("href", hrefDest)
    newItemA.setAttribute("style", "text-decoration: none; color: #a7ccea; font-size: 13px; font-weight: bold;")
    newItemA.textContent = title
    newItem.appendChild(newItemA)

    let newItemB = document.createElement("a")
    newItemB.setAttribute("href", hrefDest)
    newItemB.setAttribute("style", "text-decoration: none; color: #ffb7c5; font-size: 13px; font-weight: bold;")
    newItemB.textContent = dub
    newItem.appendChild(newItemB)
}

function listPGCleanUp() {
    document.querySelectorAll('.listItem').forEach(e => e.remove());
    document.querySelectorAll('.alphabet > button').forEach(e => e.setAttribute("style", "background-color: rgb(35,35,35);"));
    document.querySelectorAll('.alphabet > button').forEach(e => e.setAttribute("onmouseover", "this.style.background='rgb(50,50,50)'"))
    document.querySelectorAll('.alphabet > button').forEach(e => e.setAttribute("onmouseout", "this.style.background='rgb(35,35,35)'"))
    if (currentLetter != "#") {
        document.getElementById(currentLetter.toUpperCase()).setAttribute("style", "background-color: rgb(50,50,50);")
        document.getElementById(currentLetter.toUpperCase()).setAttribute("onmouseout", "this.style.background='rgb(50,50,50)'")
    } else {
        document.getElementById("#").setAttribute("style", "background-color: rgb(50,50,50);")
        document.getElementById("#").setAttribute("onmouseout", "this.style.background='rgb(50,50,50)'")
    }
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
}

function loadList(searchParam, onlyLetter, subdub) {
    if (onlyLetter === true) {
        let i = allAnimeList.length
        while (i--) {
            if (allAnimeList[i].title.toLowerCase().charAt(0) == searchParam) {
                var str = allAnimeList[i].title.split(" (Dub)")[0]
                var subOrDub = ""
                if (str.length > 44) {
                    str = str.substring(0, 44) + "..."
                }
                if ((subdub == "any") || (subdub == "dub")) {
                    if (allAnimeList[i].title.search("(Dub)") > -1) {
                        subOrDub = " [Dub]"
                    }
                }
                if ((subdub == "dub") && allAnimeList[i].title.search("(Dub)") > -1) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
                if ((subdub == "sub") && allAnimeList[i].title.search("(Dub)") == -1) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
                if ((subdub == "any")) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
            }
        }
    } else {
        let i = allAnimeList.length
        while (i--) {
            if (allAnimeList[i].title.toLowerCase().includes(searchParam.toLowerCase())) {
                var str = allAnimeList[i].title.split(" (Dub)")[0]
                var subOrDub = ""
                if (str.length > 44) {
                    str = str.substring(0, 44) + "..."
                }
                if ((subdub == "any") || (subdub == "dub")) {
                    if (allAnimeList[i].title.search("(Dub)") > -1) {
                        subOrDub = " [Dub]"
                    }
                }
                if ((subdub == "dub") && allAnimeList[i].title.search("(Dub)") > -1) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
                if ((subdub == "sub") && allAnimeList[i].search("(Dub)") == -1) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
                if ((subdub == "any")) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
            }
        }
    }
    if (searchParam == "#") {
        let i = allAnimeList.length
        while (i--) {
            if (!(isLetter(allAnimeList[i].title.charAt(0)))) {
                var str = allAnimeList[i].title.split(" (Dub)")[0]
                var subOrDub = ""
                if (str.length > 44) {
                    str = str.substring(0, 44) + "..."
                }
                if ((subdub == "any") || (subdub == "dub")) {
                    if (allAnimeList[i].title.search("(Dub)") > -1) {
                        subOrDub = " [Dub]"
                    }
                }
                if ((subdub == "dub") && allAnimeList[i].title.search("(Dub)") > -1) {
                    createCard(str, subOrDub, data[i].modifiedTitle)
                }
                if ((subdub == "sub") && allAnimeList[i].title.search("(Dub)") == -1) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
                if ((subdub == "any")) {
                    createCard(str, subOrDub, allAnimeList[i].modifiedTitle)
                }
            }
        }
    }
}

loadList(currentLetter, true, subDubType) //Init Loader

//Drop down handler
document.getElementById("dropDownMenu").addEventListener("change", function() {
    subDubType = document.getElementById("dropDownMenu").value
    if (document.getElementById("filterBar").value.trim().length > 1) {
        listPGCleanUp()
        loadList(document.getElementById("filterBar").value.trim(), false, subDubType)
    } else {
        listPGCleanUp()
        loadList(currentLetter, true, subDubType)
    }
})

//Filter search bar handler
document.getElementById("filterBar").addEventListener("input", function(input) {
    if (input.target.value.toString().trim().length > 1) {
        listPGCleanUp()
        loadList(input.target.value.toString(), false, subDubType)
    } else {
        listPGCleanUp()
        loadList(currentLetter, true, subDubType)
    }
})

document.getElementById("filterBar").addEventListener("change", function(input) {
    if (input.target.value.toString().trim().length > 1) {
        listPGCleanUp()
        loadList(input.target.value.toString(), false, subDubType)
    }
})

document.getElementById("filterBar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("filterBar").blur()
    }
})

//Top Alphabet filter handler
document.querySelectorAll(".alphabet > button").forEach((btn) => {
    if (btn.id == "#") {
        document.getElementById(btn.id).addEventListener("click", function() {
            currentLetter = "#"
            listPGCleanUp()
            loadList(currentLetter, true, subDubType)
        })
    } else {
        document.getElementById(btn.id).addEventListener("click", function() {
            currentLetter = btn.id.toString().toLowerCase()
            listPGCleanUp()
            loadList(currentLetter, true, subDubType)
        })
    }
})

}