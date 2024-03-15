import gogolink from "./gogolink.json" assert {type: "json"}
if (window.location.href.includes("/streaming/")) {

    var epDisplayOptToggle = false

    //Video player extraction
    function getStreamSpecificEp(url) {
        return fetch(url).then(res => res.text()).then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const streamOptionList = doc.querySelectorAll(".anime_muti_link > ul > li > a")
            const streamEpisodes = parseInt(doc.querySelectorAll("#episode_page > li")[doc.querySelectorAll("#episode_page > li").length - 1].querySelector("a").getAttribute("ep_end"))
            const streamDownload = doc.querySelector(".dowloads > a").getAttribute("href")

            //Episode # larger than 99 will use a dropdown
            if ((doc.querySelectorAll("#episode_page > li").length - 1) > 1) {
                for (let i = 0; i < streamEpisodes; i += 100) {
                    const start = i;
                    const end = Math.min(i + 99, streamEpisodes);
                    var newOption = new Option("Episodes: " + `${start}-${end}`, `${start}-${end}`, true, true)
                    document.querySelector("#episodeDisplayOption").appendChild(newOption)
                }
                document.getElementById("episodeDisplayOption").selectedIndex = 0;
                document.getElementById("episodeDisplayOption").style.visibility = "visible"
                epDisplayOptToggle = true
            }

            //Episode Option Drop down handler
            document.getElementById("episodeDisplayOption").addEventListener("change", function() {                
                document.getElementById("episodeGrid").querySelectorAll("button").forEach(button => {
                    document.getElementById("episodeGrid").removeChild(button)
                })

                let range = episodeDisplayOption.options[episodeDisplayOption.selectedIndex].value.split("-")
                let startBunch = range[0] === "0" ? "1" : range[0];
                let endBunch = range[1]
                for (let i = endBunch; i >= startBunch; i--) {
                    createEpisodeButton(i);
                }
            })

            //Switch Episode option drop down to selected episode based on top link
            for (let i = 0; i < document.getElementById("episodeDisplayOption").options.length; i++) {
                const range = episodeDisplayOption.options[i].value.split('-');
                const startRange = parseInt(range[0]);
                const endRange = parseInt(range[1]);

                if (parseInt(window.location.href.split("episode-")[1]) >= startRange && parseInt(window.location.href.split("episode-")[1]) <= endRange) {
                    episodeDisplayOption.selectedIndex = i;
                    break;
                }
            }

            var exportContent = [];
            
            //Push episode list to index 0
            exportContent.push(streamEpisodes);
            exportContent.push(streamDownload)

            Array.from(streamOptionList).map(options => {
                const serverOption = options.textContent.replace("Choose this server", "").trim()
                const serverData = options.getAttribute("data-video")
                exportContent.push({serverOption, serverData})
            })

            return exportContent;
        }).catch(err => {
            window.location.href = location.protocol + '//' + location.host + "/SakuraAnime/"
        })
    }

    //Anime info extraction
    function getAnimeInfo(url) {
        return fetch(url).then(res => res.text()).then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html")
            const infoIMG = doc.querySelector(".anime_info_body_bg > img").src
            const infoType = doc.querySelector(".anime_info_body_bg > p:nth-child(4) > a").innerHTML
            const infoSummary = doc.querySelector(".anime_info_body_bg > p:nth-child(5)").textContent.split("Plot Summary: ")[1]
            let infoGenres = doc.querySelector(".anime_info_body_bg > p:nth-child(7)").querySelectorAll("a[title]");
            infoGenres = Array.from(infoGenres).map(a => a.getAttribute('title')); // Extract titles
            infoGenres = infoGenres.join(", ");
            const infoStatus = doc.querySelector(".anime_info_body_bg > p:nth-child(9) > a").textContent
            const infoOtherNames = doc.querySelector(".anime_info_body_bg > p:nth-child(9)").textContent.split("Other name: ")[1]

            return {infoIMG, infoType, infoSummary, infoGenres, infoStatus, infoOtherNames}
        })
    }
    
    function createOption(optionName) {
        var newOption = new Option(optionName, optionName, true, true)
        document.querySelector("#dropDownStreamingOption").appendChild(newOption)
    }

    function createEpisodeButton(episodeNumber) {
        let newEpisodeBtn = document.createElement("button")
        newEpisodeBtn.textContent = "EP " + episodeNumber
        document.querySelector(".episodeGrid").appendChild(newEpisodeBtn)

        newEpisodeBtn.addEventListener("click", function() {
            window.location.href = window.location.href.split("episode-")[0] + "episode-" + episodeNumber;
        })
    }

    const pendingInfoData = getAnimeInfo(gogolink[0] + "category/" + window.location.href.split("/streaming/")[1].split("-episode-")[0])
    const pendingData = getStreamSpecificEp(gogolink[0] + window.location.href.split("/streaming/")[1])
    
    Promise.all([
        pendingInfoData,
        pendingData
    ]).then(([animeInfoData, streamData]) => {
        //export animeInfoData preloaded information to info section
        const event = new CustomEvent('animeDataReady', { detail: { animeInfoData } });
        document.dispatchEvent(event);

        //Init disable next Episode
        if (parseInt(window.location.href.split("episode-")[1]) + 1 > streamData[0]) {
            document.getElementById("nextEpisodeBtn").style.color = "#b7b7b7";
        }

        //Change Episode Label
        document.querySelector(".streamingTopBarLabel").textContent = "Episode " + window.location.href.split("episode-")[1];

        //Init videostreaming 1st
        const iframeEl = document.getElementById("videoPlayer")
        iframeEl.setAttribute("src", streamData[2].serverData);

        //Create Episode # Buttons
        if (!epDisplayOptToggle) {
            for (let i = streamData[0]; i >= 1; i--) {
                createEpisodeButton(i);
            }
        } else {
            let range = episodeDisplayOption.options[episodeDisplayOption.selectedIndex].value.split("-")
            let startBunch = range[0] === "0" ? "1" : range[0];
            let endBunch = range[1]
            for (let i = endBunch; i >= startBunch; i--) {
                createEpisodeButton(i);
            }
        }

        //Init streamingOptions in dropdown
        for (var i = 2; i < streamData.length; i++) {
            createOption(streamData[i].serverOption)
        }
        document.querySelector('[value="Select Video Server"]').setAttribute("selected", true)
        document.querySelector('[value="Select Video Server"]').setAttribute("disabled", true)

        //Stream Option Drop down handler
        document.getElementById("dropDownStreamingOption").addEventListener("change", function() {
            var selectedServer = document.getElementById("dropDownStreamingOption").value
            
            streamData.slice(2).forEach((server, i) => {
                console.log(server, i)
                if (server.serverOption === selectedServer) {
                    iframeEl.setAttribute("src", streamData[i + 2].serverData);
                }
            })
        })

        //Top bar Next Episode Handler
        document.getElementById("nextEpisodeBtn").addEventListener("click", function() {
            if (parseInt(window.location.href.split("episode-")[1]) + 1 <= streamData[0]) {
                window.location.href = window.location.href.split("episode-")[0] + "episode-" + (parseInt(window.location.href.split("episode-")[1]) + 1)
            }
        })

        //Top bar Download Handler
        document.getElementById("downloadEpisodeBtn").addEventListener("click", function() {
            document.getElementById("downloadEpisodeBtn").setAttribute("href", streamData[1])
            document.getElementById("downloadEpisodeBtn").setAttribute("target", "_blank")
        })
    })

    /*
    pendingData.then(data => { //Init Loader for fresh request
        //Init disable next Episode
        if (parseInt(window.location.href.split("episode-")[1]) + 1 > data[0]) {
            document.getElementById("nextEpisodeBtn").style.color = "#b7b7b7";
        }

        //Change Episode Label
        document.querySelector(".streamingTopBarLabel").textContent = "Episode " + window.location.href.split("episode-")[1];

        //Init videostreaming 1st
        const iframeEl = document.getElementById("videoPlayer")
        iframeEl.setAttribute("src", data[2].serverData);

        //Create Episode # Buttons
        if (!epDisplayOptToggle) {
            for (let i = data[0]; i >= 1; i--) {
                createEpisodeButton(i);
            }
        } else {
            let range = episodeDisplayOption.options[episodeDisplayOption.selectedIndex].value.split("-")
            let startBunch = range[0] === "0" ? "1" : range[0];
            let endBunch = range[1]
            for (let i = endBunch; i >= startBunch; i--) {
                createEpisodeButton(i);
            }
        }

        //Init streamingOptions in dropdown
        for (var i = 2; i < data.length; i++) {
            createOption(data[i].serverOption)
        }
        document.querySelector('[value="Select Video Server"]').setAttribute("selected", true)
        document.querySelector('[value="Select Video Server"]').setAttribute("disabled", true)

        //Stream Option Drop down handler
        document.getElementById("dropDownStreamingOption").addEventListener("change", function() {
            var selectedServer = document.getElementById("dropDownStreamingOption").value
            
            data.slice(2).forEach((server, i) => {
                console.log(server, i)
                if (server.serverOption === selectedServer) {
                    iframeEl.setAttribute("src", data[i + 2].serverData);
                }
            })
        })

        //Top bar Next Episode Handler
        document.getElementById("nextEpisodeBtn").addEventListener("click", function() {
            if (parseInt(window.location.href.split("episode-")[1]) + 1 <= data[0]) {
                window.location.href = window.location.href.split("episode-")[0] + "episode-" + (parseInt(window.location.href.split("episode-")[1]) + 1)
            }
        })

        //Top bar Download Handler
        document.getElementById("downloadEpisodeBtn").addEventListener("click", function() {
            document.getElementById("downloadEpisodeBtn").setAttribute("href", data[1])
            document.getElementById("downloadEpisodeBtn").setAttribute("target", "_blank")
        })
    })*/

}