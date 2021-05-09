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
    // Render Moving animals
    loadAnimals();
}

function loadAnimals() {
    $(document).ready(function(){
        let windowLength = window.innerWidth;
        let windowHeight = window.innerHeight;
        let animalImagesFolder = './assets/images/map-assets/';
        let wolf = 'wolf.png';
        for (var i = 0; i < 100; i++) {
            document.getElementById('6|6').innerHTML += (
                '<img id="wolf-' + (i + 1).toString() + '" class="moving-items" src="' + animalImagesFolder+wolf + '"/>'
            );
            $('#wolf-'+(i + 1).toString())[0].style.width = '30px';
            $('#wolf-'+(i + 1).toString())[0].style.height = '30px';
            $('#wolf-'+(i + 1).toString())[0].style.opacity = '100%';
            moveAnimal('wolf-'+(i + 1).toString(), 2500, 2500, 30, 30);
        }
    });
}

async function moveAnimal(elementID, screenWidth, screenHeight, animalWidth, animalHeight) {
    let mapTop = 6 * 50;
    let mapLeft = 6 * 50;
    let leftRate = 1;
    let topRate = 1;
    while (true) {
        // Handle random movement X, Y
        var random = Math.random();
        if (random > 0.95 && leftRate === 1) {
            leftRate = -1;
        } else if (random > 0.95 && leftRate === -1) {
            leftRate = 1;
        }
        if (random > 0.99 && leftRate !== 0) {
            leftRate = 0;
        } else if (random > 0.99 && leftRate === 0) {
            leftRate = 1;
        } 
        
        var random = Math.random();
        if (random > 0.95 && topRate === 1) {
            topRate = -1;
        } else if (random > 0.95 && topRate === -1) {
            topRate = 1;
        }
        if (random > 0.99 && topRate !== 0) {
            topRate = 0;
        } else if (random > 0.99 && topRate === 0) {
            topRate = 1;
        }

        // Control horizontal action
        if (mapLeft > screenWidth - 4 * animalWidth) {
            // console.log(elementID + ' will stop going right');
            leftRate = -1;
        }
        if (mapLeft < 4 * animalWidth) {
            // console.log(elementID + ' will stop going left');
            leftRate = 1;
        }
        // Control vertical action
        if (mapTop > screenHeight - 4 * animalHeight) {
            // console.log(elementID + ' will stop going right');
            topRate = -1;
        }
        if (mapTop < 4 * animalHeight) {
            // console.log(elementID + ' will stop going left');
            topRate = 1;
        }

        // Output movement
        mapLeft = mapLeft + leftRate;
        mapTop = mapTop + topRate;
        document.getElementById(elementID).style.left = mapLeft.toString()+'px';
        document.getElementById(elementID).style.top = mapTop.toString()+'px';
        await sleep(5);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}