import allGenres from "./allGenres.json" assert {type: "json"}

if (window.location.href == location.protocol + '//' + location.host + "/SakuraAnime/genres") {

function createCard(title) {
    //add list details
    let newItem = document.createElement("div")
    newItem.setAttribute("class", "genreItem")
    newItem.setAttribute("style", "font-size: 13px; font-weight: bold; overflow: hidden;")
    document.querySelector(".genreHolder").appendChild(newItem)
    
    let newItemA = document.createElement("a")
    newItemA.setAttribute("href", "./genres/"+title.toLowerCase().replace(/\s/g, "-").replace(/\s/g, "-"))
    newItemA.setAttribute("style", "text-decoration: none; color: #ffb7c5; font-size: 13px; font-weight: bold;")
    newItemA.textContent = title
    newItem.appendChild(newItemA)
}

for (let i = 0; i < allGenres.length; i++) {
    createCard(allGenres[i])
}

}