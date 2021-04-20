/* Game code here */

const songs = {
    '01_Autos_locos.mp3': {
        'track_number': 1,
        'duration_milliseconds': 37000 // 00:37
    },
    '01_Dyane_6.mp3': {
        'track_number': 2,
        'duration_milliseconds': 58000 // 00:58
    },
    '05_Almas_gemelas.mp3': {
        'track_number': 3,
        'duration_milliseconds': 80000 // 01:20
    },
    '07_El_cocotero.mp3': {
        'track_number': 4,
        'duration_milliseconds': 69000 // 01:09
    },
    '08_Princess_of_Persia.mp3': {
        'track_number': 5,
        'duration_milliseconds': 56000 // 00:56
    }
    ,
    '09_Bloop.mp3': {
        'track_number': 6,
        'duration_milliseconds': 118000 // 01:58
    }
    ,
    '11_Captain_Nemo.mp3': {
        'track_number': 7,
        'duration_milliseconds': 77000 // 01:17
    }
    ,
    '12_Juicy.mp3': {
        'track_number': 8,
        'duration_milliseconds': 66000 // 01:06
    }    
};

const screenHeight = screen.height;
const screenWidth = screen.width;
const cubeSize = 25;

let displayHeight = parseInt(screenHeight * 0.85);
let displayWidth = parseInt(screenWidth * 0.90);

localStorage.setItem(
    'game-board', 
    JSON.stringify(
        {
            'bank-balance': 100,
        }
    )
);
let gameBoard = JSON.parse(
    localStorage.getItem('game-board')
);
// console.log(gameBoard);

function storeGameData(gameData) {
    localStorage.setItem(
        'game-board', 
        JSON.stringify(
            gameData
        )
    );
}

function getGameData() {
    let gameData = JSON.parse(
        localStorage.getItem('game-board')
    );
    return gameData;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playMusic() {
    while (true) {
        for (let songName in songs) {
            console.log(songName);
            document.getElementById('game-music-' + songs[songName]['track_number'].toString()).play();
            await sleep(
                songs[songName]['duration_milliseconds'] + 10000
            );
        }
    }
}

function setScreenDimensions() {
    document.getElementById('root').style.height = displayHeight.toString() + 'px';
    document.getElementById('root').style.width = displayWidth.toString() + 'px';
    document.getElementById('root').style.border = 'solid 1px black';
}

function hideGreeting() {
    document.getElementById('greeting').style.display = 'none';
}

function createGameGrid() {
    document.getElementById('root').innerHTML = '<table id="game-table"></table>';
    // Get rounded height - vertical
    let verticalCubeCount = Math.floor((displayHeight / cubeSize) * 0.95); // Leave space for buttons and controls
    // console.log('Height calculations');
    // console.log(verticalCubeCount);
    // Get rounded width - horizontal
    let horizontalCubeCount = Math.floor(displayWidth / cubeSize);
    // console.log('Width calculations');
    // console.log(horizontalCubeCount);
    let html = '';
    for (var y = 0; y < verticalCubeCount; y++) {
        html += '<tr>\n';
        for (var x = 0; x < horizontalCubeCount; x++) {
            var index = y.toString() + '|' + x.toString();
            html += '<td id="' + index + '" onclick="adoptActiveElement(\'' + index + '\');" class="show-pointer" style="background-color: lightgreen; width:' + (cubeSize * 0.8).toString() + 'px; height: ' + (cubeSize * 0.8).toString() + 'px;">\n';
            html += '</td>\n';
        }
        html += '</tr>\n';
    }
    document.getElementById('game-table').innerHTML = html;
}

function createGameControls() {
    let controlsHeight = Math.floor((displayHeight / cubeSize) * 0.15) * cubeSize;
    document.getElementById('root').innerHTML += '<div id="control-buttons"></div>';
    let controlButtons = document.getElementById('control-buttons');
    let controlButtonsStyle = document.getElementById('control-buttons').style;
    controlButtonsStyle.width = '95%';
    controlButtonsStyle.marginLeft = 'auto';
    controlButtonsStyle.marginRight = 'auto';
    controlButtonsStyle.height = controlsHeight.toString() + 'px';
    // controlButtonsStyle.border = 'solid 2px blue';
    controlButtonsStyle.borderRadius = '5px';
    // Change cell buttons
    
    controlButtons.innerHTML += `
    <table>
        <tr>
            <td style="text-align: left; padding: 10px;">
                Game Clock:
                <br><span id="game-clock-date">01/01/1999</span>
                <br><span id="game-clock-time">00:00:00</span>
            </td>
        
            <td style="text-align: left; padding-left: 10px; padding-right: 10px;">
                Active Element:
                <br><b id="active-element">Nothing</b>
            </td>

            <td style="text-align: left; padding: 10px;">
                <p style="margin: 0px;">
                    Land Designation:
                </p>
                <p style="margin: 0px;">
                    <table>
                        <tr>
                            <td style="text-align: left; height: 20px;">
                                Residential:
                            </td>
                            <td onclick="setActiveElement('residential');" class="show-pointer" style="width: 30px; background-color: darkgreen; color: darkgreen;">
                                X
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: left; height: 20px;">
                                Commercial:
                            </td>
                            <td onclick="setActiveElement('commercial');" class="show-pointer" style="width: 30px; background-color: darkblue; color: darkblue;">
                                X
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: left; height: 20px;">
                                Industrial:
                            </td>
                            <td onclick="setActiveElement('industrial');" class="show-pointer" style="width: 30px; background-color: darkorange; color: darkorange;">
                                X
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: left; height: 20px;">
                                Road:
                            </td>
                            <td onclick="setActiveElement('road');" class="show-pointer" style="width: 30px; background-color: black; color: black;">
                                X
                            </td>
                        </tr>
                    </table>
                </p>
            </td>

            <td style="text-align: left; padding: 10px;">
                Your population vs capacity:
                <br><span id="your-population">0</span> / <span id="population-capacity">0</span>
                <br>
                <br>Population Waiting:
                <br><span id="population-waiting">0</span>
            </td>

            <td style="text-align: left; padding: 10px;">
                Bank Balance: $<span id="bank-balance">100</span>
            </td>

        </tr>
    </table>`;
}

function setActiveElement(become) {
    document.getElementById('active-element').innerHTML = become.toString();
}

async function setGameDateTime() {
    while (true) {
        await sleep(998);
        var currentDateTime = new Date();
        var stringDate = currentDateTime.toLocaleDateString();
        var stringTime = currentDateTime.toLocaleTimeString();
        document.getElementById('game-clock-date').innerHTML = stringDate;
        document.getElementById('game-clock-time').innerHTML = stringTime;
    }
}

let populationGrowthRate = 1;
let populationWaiting = 0;
let maximumWaitingPopulation = 100;

async function populationGrowth() {
    await sleep(10000);
    while (true) {
        await sleep(998 * 5);
        populationWaiting += populationGrowthRate;
        if (populationWaiting > maximumWaitingPopulation) {
            populationWaiting = maximumWaitingPopulation;
        }
        var yourPopulation = parseInt(document.getElementById('your-population').innerHTML);
        var populationCapacity = parseInt(document.getElementById('population-capacity').innerHTML);
        var takingCapacity = populationCapacity - yourPopulation;
        var populationToAdd = 0;
        if (populationCapacity > yourPopulation) {
            if (takingCapacity - populationWaiting >= 0) {
                populationToAdd = populationWaiting;
                populationWaiting = 0;
            } else {
                populationToAdd = takingCapacity;
                populationWaiting = populationWaiting - takingCapacity;
            }
        }
        document.getElementById('population-waiting').innerHTML = populationWaiting;
        document.getElementById('your-population').innerHTML = yourPopulation + populationToAdd
        
    }
}

const elements = {
    'residential': {
        'styling': {
            'backgroundColor': 'darkgreen',
            'color': 'darkgreen'
        },
        'cost': 10,
        'revenue': 0,
        'populationCapacity': 10,
    },
    'commercial': {
        'styling': {
            'backgroundColor': 'darkblue',
            'color': 'darkblue'
        },
        'cost': 15,
        'revenue': 5,
        'populationCapacity': 0,
    },
    'industrial': {
        'styling': {
            'backgroundColor': 'darkorange',
            'color': 'darkorange'
        },
        'cost': 5,
        'revenue': 1,
        'populationCapacity': 0,
    },
    'road': {
        'styling': {
            'backgroundColor': 'black',
            'color': 'black'
        },
        'cost': 1,
        'revenue': 0,
        'populationCapacity': 0,
    },
}

async function calculateBankBalance() {
    while (true) {
        // console.log(gameBoard['commercial-blocks-count']);
        let commercialCount = 0;
        if (gameBoard['commercial-blocks-count'] > 0) {
            commercialCount = gameBoard['commercial-blocks-count'];
        }
        let commercialIncome = commercialCount * elements['commercial']['revenue'];
        gameBoard['bank-balance'] += commercialIncome;
        updateBankBalance(gameBoard);
        await sleep(10000);
    }
}

function updateResidentialBlock(gameBoard) {
    // Read how many residential zones and get their capacity
    let residentialCount = 0;
    for (var index in gameBoard) {
        if (index.indexOf('|') < 0) {
            continue;
        }
        // Increment residential count
        if ('element-type' in gameBoard[index]) {
            if (gameBoard[index]['element-type'] === "residential") {
                residentialCount += 1;
            }
            // add checks here
        }
        
    }
    residentialCapacity = elements['residential']['populationCapacity'] * residentialCount;
    document.getElementById('population-capacity').innerHTML = residentialCapacity;
}

function updateCommercialBlock(gameBoard) {
    // Read how many commercial zones and get their capacity
    let commercialCount = 0;
    for (var index in gameBoard) {
        if (index.indexOf('|') < 0) {
            continue;
        }
        // Increment commercial count
        if ('element-type' in gameBoard[index]) {
            if (gameBoard[index]['element-type'] === "commercial") {
                commercialCount += 1;
            }
            // add checks here
        }
        
    }
    gameBoard['commercial-blocks-count'] = commercialCount;
    // residentialCapacity = elements['residential']['populationCapacity'] * residentialCount;
    // document.getElementById('population-capacity').innerHTML = residentialCapacity;
}

function updateBankBalance(gameBoard) {
    let bankBalance = gameBoard['bank-balance'];
    document.getElementById('bank-balance').innerHTML = bankBalance;
}


function updateGameScreen(gameBoard) {
    // Read how many residential zones and get their capacity
    updateResidentialBlock(gameBoard);
    // Read how many commercial zones and get their capacity
    updateCommercialBlock(gameBoard);
    // Read the bank balance and update
    updateBankBalance(gameBoard);
}

/* This the main function, when an item is clicked it 
adopts the characteristics of the active element */
function adoptActiveElement(row_column) {
    // console.log(row_column);
    let new_element = document.getElementById('active-element').innerHTML;
    for (var element in elements) {
        if (element == new_element) {
            gameBoard = getGameData();
            let bankBalance = gameBoard['bank-balance'];
            if (bankBalance < elements[element]['cost']) {
                alert('Cannot afford: ' + new_element);
                return false;
            } else {
                gameBoard['bank-balance'] = bankBalance - elements[element]['cost'];
            }
            let indexExists = false;
            for (var index in gameBoard) {
                // console.log(index);
                if (index == row_column) {
                    indexExists = true;
                }
            }
            if (indexExists === false) {
                gameBoard[row_column] = {
                    'element-type': element
                };
                storeGameData(gameBoard);
            } else {
                gameBoard[row_column]['element-type'] = element;
                storeGameData(gameBoard);
            }
            updateGameScreen(gameBoard);

            for (var styling in elements[element]['styling']) {
                if ('backgroundColor' == styling) {
                    document.getElementById(row_column).style.backgroundColor = elements[element]['styling'][styling];
                }
                if ('color' == styling) {
                    document.getElementById(row_column).style.backgroundColor = elements[element]['styling'][styling];
                }
            }
        }
    }
}

function runGame() {
    // playMusic();
    hideGreeting();
    setScreenDimensions();
    createGameGrid();
    createGameControls();
    setGameDateTime();
    populationGrowth();
    calculateBankBalance();
}