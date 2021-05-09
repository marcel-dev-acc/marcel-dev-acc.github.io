/* Game code here */
const baseUrl = 'http://127.0.0.1:5500';
const htmlFolder = '/js-legacy-war/assets/html/';
const jsonMapFolder = '/js-legacy-war/assets/map/';

const mapGridSizeY = 50;
const mapGridSizeX = 50;

function loadWelcome() {
    $(document).ready(function(){
        loadHtml(baseUrl+htmlFolder+'welcome.html');
        /* For development you will want to re-route to relevant html page */
        loadHtml(baseUrl+htmlFolder+'map.html');
    });
}

function loadHtml(path) {
    $.get(path,
        { '_': $.now() } // Prevents caching
    ).done(function(data) {
        // Here's the HTML
        var html = data;
        rendHtml(html);
    }).fail(function(jqXHR, textStatus) {
        // Handle errors here
    });
}

function loadJsonMap(path) {
    $.get(path,
        { '_': $.now() } // Prevents caching
    ).done(function(data) {
        // Here's the HTML
        var json = data;
        renderJsonMap(json);
    }).fail(function(jqXHR, textStatus) {
        // Handle errors here
    });
}

function rendHtml(html) {
    $('#root').html(html);
}

function loadCivilisations() {
    $(document).ready(function(){
        loadHtml(baseUrl+htmlFolder+'choose-civilisation.html');
    });
}

function designMap() {
    $(document).ready(function(){
        let html = '';
        for (var i = 0; i < mapGridSizeY; i++) {
            html += '<div class="map-row" id="' + (i + 1).toString() + '">';
            for (var j = 0; j < mapGridSizeX; j++) {
                html += '<div class="map-column" id="' + (i + 1).toString() + '|' + (j + 1).toString() + '"></div>'
            }
            html += '</div>';
        }
        $('#map').html(html);
        // Render map icons on div's
        loadJsonMap(baseUrl+jsonMapFolder+'map-1.json');
    });
}

function renderJsonMap(json) {
    const jsonMapping = {
        "grass-inner": "./assets/images/map-assets/grass-inner.png",
        "mountain-inner": "./assets/images/map-assets/mountain-inner.png",
        "water-inner": "./assets/images/map-assets/water-inner.png",
        "forest-top": "./assets/images/map-assets/forest-top-inner.png",
        "forest-bottom": "./assets/images/map-assets/forest-bottom.png",
        "snow-inner": "./assets/images/map-assets/snow-inner.png",
        "snow-grass-lr": "./assets/images/map-assets/snow-grass-lr.png",
        "grass-snow-lr": "./assets/images/map-assets/grass-snow-lr.png",
        "desert-inner": "./assets/images/map-assets/desert-inner.png",
        "grass-desert-lr": "./assets/images/map-assets/grass-desert-lr.png",
        "desert-grass-lr": "./assets/images/map-assets/desert-grass-lr.png",
        "grass-water-lr": "./assets/images/map-assets/grass-water-lr.png",
        "water-grass-lr": "./assets/images/map-assets/water-grass-lr.png",
        "water-grass-rl": "./assets/images/map-assets/water-grass-rl.png",
        "grass-water-rl": "./assets/images/map-assets/grass-water-rl.png",
        "water-desert-lr": "./assets/images/map-assets/water-desert-lr.png",
        "water-desert-rl": "./assets/images/map-assets/water-desert-rl.png",
        "dune-inner": "./assets/images/map-assets/dune-inner.png",
    };
    for (var i = 0; i < mapGridSizeY; i++) {
        for (var j = 0; j < mapGridSizeX; j++) {
            let id = (i + 1).toString() + '|' + (j + 1).toString();
            let mapValue = jsonMapping[json[id]];
            let html = '<img src="' + mapValue + '">';
            if (mapValue !== undefined) {
                document.getElementById(id).innerHTML = html;
            }
        }
    }
}