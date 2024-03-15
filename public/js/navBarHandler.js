document.getElementById("searchFocused").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("searchFocused").blur()
        window.location.href = location.protocol + '//' + location.host + "/SakuraAnime/searchresults/" + document.getElementById("searchFocused").value.replace(/\s+/g, "-")
    }
})