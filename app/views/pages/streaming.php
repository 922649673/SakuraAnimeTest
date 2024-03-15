<?php require APPROOT . '/views/inc/header.php'; ?>

<div class="streamingBody">
    <div class="streamingTopBar">
        <p class="streamingTopBarLabel"></p>
        <a id="nextEpisodeBtn">
            <i class="glyphicon glyphicon-chevron-right"></i>
        </a>
        <a id="downloadEpisodeBtn">
            <i class="glyphicon glyphicon-download-alt"></i>
        </a>
        <iframe id="videoPlayer" src="" allowfullscreen="true" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="900" height="506"></iframe>
        
        <div class="streamingBottomBar">
            <select id="dropDownStreamingOption">
                <option value="Select Video Server">Select Video Server</option>
                <!--<option value=""></option>-->
            </select>
            <select id="episodeDisplayOption">
                <!--<option value=""></option>-->
            </select>
        </div>
        <div class="episodeBar">
            <div class="episodeGrid" id="episodeGrid"></div>
        </div>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>