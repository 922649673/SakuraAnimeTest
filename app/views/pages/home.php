<?php require APPROOT . '/views/inc/header.php'; ?>

<div>
    <div class="featured center">
        <a href="/" id="featuredImgA"><img id="featuredImg" src="<?php echo URLROOT ?>/imgs/gray.png" alt="" width=10% height=100% margin-left=9px margin-top=2.25px></a>
        <a href="/" class="featuredTitle" id="featuredT"></a>
        <p class="featuredInfo" id="featuredI"></p>
        <i class="glyphicon glyphicon-tags" id="genreTag"></i>
        <p id="genreList"></p>
        <i class="glyphicon glyphicon-chevron-right" id="featuredRight" onmouseover="this.style.color='white'" onmouseout="this.style.color='#ffb7c5'"></i>
    </div>
    <div class="homeBtn center">
        <ol>
            <button class="homeSpecificBtn" id="recentSubBtn" style="background-color: rgb(50,50,50);"  onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Sub</button>
            <button class="homeSpecificBtn" id="recentDubBtn" onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Dub</button>
            <button class="homeSpecificBtn" id="recentChineseBtn" onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Chinese</button>
            <button class="homeSpecificBtn" id="recentPopularBtn" onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Popular</button>
            <button class="homeSpecificBtn" id="recentMovieBtn" onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Movie</button>
            <button class="homeSpecificBtn" id="recentSeasonBtn" onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Seasonal</button>
            <button class="homeSpecificBtn" id="GenresBtn" onmouseover="this.style.background='rgb(50,50,50)'" onmouseout="this.style.background='rgb(35,35,35)'">Genres</button>
        </ol>
    </div>
    <div id="animeList" class="center">
        <ul id="items"></ul>
    </div>
    <button class="showMore" id="showMoreBtn"><i class="glyphicon glyphicon-chevron-down" id="showMoreIcon"></i></button>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>