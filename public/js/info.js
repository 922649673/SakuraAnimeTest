if (window.location.href.includes("/info/")) {

document.addEventListener('animeDataReady', (event) => {
    // Access animeInfoData from the event detail
    const { animeInfoData } = event.detail;
    console.log("Generated from info.js", animeInfoData);
    // Other operations...
});

}

//local storage method