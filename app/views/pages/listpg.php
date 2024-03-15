<?php require APPROOT . '/views/inc/header.php'; ?>

<div class="testingCenter">
    <div class="alphabet">
        <button id="#">#</button>
        <button id="A" style="background-color: rgb(50,50,50);">A</button>
        <button id="B">B</button>
        <button id="C">C</button>
        <button id="D">D</button>
        <button id="E">E</button>
        <button id="F">F</button>
        <button id="G">G</button>
        <button id="H">H</button>
        <button id="I">I</button>
        <button id="J">J</button>
        <button id="K">K</button>
        <button id="L">L</button>
        <button id="M">M</button>
        <button id="N">N</button>
        <button id="O">O</button>
        <button id="P">P</button>
        <button id="Q">Q</button>
        <button id="R">R</button>
        <button id="S">S</button>
        <button id="T">T</button>
        <button id="U">U</button>
        <button id="V">V</button>
        <button id="W">W</button>
        <button id="X">X</button>
        <button id="Y">Y</button>
        <button id="Z">Z</button>
    </div>
    <div class="filter">
        <p class="filterInfo">Sub/Dub: </p>
        <div class="dropdownA">
            <select id="dropDownMenu">
                <option value="any">Any</option>
                <option value="sub">Sub</option>
                <option value="dub">Dub</option>
            </select>
        </div>
        <input id="filterBar" type="text" placeholder="Filter" autocomplate="off" >
    </div>
    <div class="listHolder"></div>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>