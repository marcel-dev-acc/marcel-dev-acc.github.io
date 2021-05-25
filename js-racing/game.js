/* Game code here */

const gameWidth = 800;
const gameHeight = 800;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

let gameTop = (screenHeight / 2) - (gameHeight / 2);
// console.log(gameTop);
let gameBottom = (screenHeight / 2) + (gameHeight / 2);
// console.log(gameBottom);
let gameLeft = (screenWidth / 2) - (gameWidth / 2);
// console.log(gameLeft);
let gameRight = (screenWidth / 2) + (gameWidth / 2);
// console.log(gameRight);

const carNumber = 1;
let rotationRate = 2;
let carSpeed = 0;  // In pixels per second
let carAccelerationRate = 0.1;
let currentRotation = 0;
let maxAcceleration = 2;
let maxDeceleration = -2;
let maxSpeed = 2;
let minSpeed = 0;

function run() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    gameLeft = (screenWidth / 2) - (gameWidth / 2);
    gameRight = (screenWidth / 2) + (gameWidth / 2);
    if (setGameArea()) {
        setTrack();
        createCar(carNumber);
        carMoveLoop();
    }
}

function gameCouldNotLoad(msg) {
    document.getElementById('root').innerHTML += msg;
}

function setGameArea() {
    if (screenWidth < gameWidth * 1.1 || screenHeight < gameHeight * 1.1) {
        gameCouldNotLoad(
            '<h2>Display size must be at least '+(parseInt(gameWidth * 1.1)).toString()+' pixels wide and '+(parseInt(gameHeight * 1.1)).toString()+' pixels high.</h2>'
        );
        return false;
    }
    document.getElementById('root').style.marginTop = (
        (screenHeight / 2) - (gameHeight / 2)
    ).toString() + 'px';
    document.getElementById('root').style.width = gameWidth.toString() + 'px';
    document.getElementById('root').style.height = gameHeight.toString() + 'px';
    // set background image here
    return true;
}

function setTrack() {
    document.getElementById('root').innerHTML = '<img class="track-image" src="./assets/images/track-1.jpg"/>';
}

function createCar(i) {
    let carLeftOffset = 0;
    let carBottomOffset = 0;
    if (gameWidth == 800 && gameHeight == 800) {
        carLeftOffset = 85;
        carBottomOffset = 400;    
    }
    zIndex = i * 10;
    document.getElementById('root').innerHTML += `
        <div id="car-`+i.toString()+`" class="car">
            <img src="./assets/images/car-green.png" style="width: 100%;"/>
        </div>`;
    document.getElementById('car-'+i.toString()).style.zIndex = zIndex;
    document.getElementById('car-'+i.toString()).style.left = (gameLeft + carLeftOffset).toString() + 'px';
    document.getElementById('car-'+i.toString()).style.bottom = (gameTop + carBottomOffset).toString() + 'px';
    if (gameWidth == 0 && gameHeight == 0) {
        document.getElementById('car-'+i.toString()).style.display = 'none';
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function carMoveLoop() {
    while (true) {
        try {
            moveCar(carNumber, carSpeed)
            await sleep(1);
        } catch(_error) {
            console.log(_error);
            break;
        }
    }
}

function moveCar(i, speed) {
    let currentX = document.getElementById('car-'+i.toString()).style.left;
    let currentY = document.getElementById('car-'+i.toString()).style.bottom;
    let y;
    let x;
    // Calculate the x, y movement
    if (currentRotation === 0) {
        y = speed;
        x = 0;
    }
    if (currentRotation > 0 && currentRotation < 45) {
        y = Math.cos(degreesToRadians(currentRotation)) * speed;
        x = Math.sin(degreesToRadians(currentRotation)) * speed;
    }
    if (currentRotation === 45) {
        y = Math.sin(degreesToRadians(45)) * speed;
        x = Math.cos(degreesToRadians(45)) * speed;
    }
    if (currentRotation > 45 && currentRotation < 90) {
        let angle = 90 - currentRotation;
        y = Math.sin(degreesToRadians(angle)) * speed;
        x = Math.cos(degreesToRadians(angle)) * speed;
    }
    if (currentRotation === 90) {
        y = 0;
        x = speed;
    }
    if (currentRotation > 90 && currentRotation < 135) {
        let angle = currentRotation - 90;
        y = -1 * Math.sin(degreesToRadians(angle)) * speed;
        x = Math.cos(degreesToRadians(angle)) * speed;
    }
    if (currentRotation === 135) {
        y = -1 * Math.sin(degreesToRadians(45)) * speed;
        x = Math.cos(degreesToRadians(45)) * speed;
    }
    if (currentRotation > 135 && currentRotation < 180) {
        let angle = 180 - currentRotation;
        y = -1 * Math.cos(degreesToRadians(angle)) * speed;
        x = Math.sin(degreesToRadians(angle)) * speed;
    }
    if (currentRotation === 180) {
        y = -speed;
        x = 0;
    }
    if (currentRotation > 180 && currentRotation < 225) {
        let angle = currentRotation - 180;
        y = -1 * Math.cos(degreesToRadians(angle)) * speed;
        x = -1 * Math.sin(degreesToRadians(angle)) * speed;
    }
    if (currentRotation === 225) {
        y = -1 * Math.cos(degreesToRadians(45)) * speed;
        x = -1 * Math.sin(degreesToRadians(45)) * speed;
    }
    if (currentRotation > 225 && currentRotation < 270) {
        let angle = 270 - currentRotation;
        y = -1 * Math.sin(degreesToRadians(angle)) * speed;
        x = -1 * Math.cos(degreesToRadians(angle)) * speed;
    }
    if (currentRotation === 270) {
        y = 0;
        x = -speed;
    }
    if (currentRotation > 270 && currentRotation < 315) {
        let angle = currentRotation - 270;
        y = Math.sin(degreesToRadians(angle)) * speed;
        x = -1 * Math.cos(degreesToRadians(angle)) * speed;
    }
    if (currentRotation === 315) {
        y = Math.sin(degreesToRadians(45)) * speed;
        x = -1 * Math.cos(degreesToRadians(45)) * speed;
    }
    if (currentRotation > 315 && currentRotation < 360) {
        let angle = 360 - currentRotation;
        y = Math.cos(degreesToRadians(angle)) * speed;
        x = -1 * Math.sin(degreesToRadians(angle)) * speed;
    }
    document.getElementById('car-'+i.toString()).style.left = (parseFloat(currentX.replace('px', '')) + parseFloat(x)).toString() + 'px';
    document.getElementById('car-'+i.toString()).style.bottom = (parseFloat(currentY.replace('px', '')) + parseFloat(y)).toString() + 'px';
}

function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function rotateCar(i, clockWise) {
    currentRotation += clockWise;
    if (currentRotation >= 360) {
        currentRotation = currentRotation - 360;
    }
    if (currentRotation < 0) {
        currentRotation = 360 + currentRotation;
    }
    // console.log(currentRotation);
    document.getElementById('car-'+i.toString()).style.transform = 'rotate('+currentRotation.toString()+'deg)';
}

let accelerateKeyIsDown = false;
let decelerateKeyIsDown = false;
let turnRightKeyIsDown = false;
let turnLeftKeyIsDown = false;

let keepAccelerating = true;
let keepDecelerating = true;
let keepTurningLeft = true;
let keepTurningRight = true;

// Used to initiate a continuous action
document.addEventListener('keydown', async function(event) {
    // console.log(event);
    if (accelerateKeyIsDown === false) {
        if (event.key === 'ArrowUp' || event.key === 'w') {
            accelerateKeyIsDown = true;
            keepAccelerating = true;
            while (keepAccelerating === true) {
                carSpeed = carSpeed + carAccelerationRate;
                if (carSpeed > maxSpeed) {
                    carSpeed = maxSpeed;
                }
                await sleep(10);
            }
        }
    }
    
    if (decelerateKeyIsDown === false) {
        if (event.key === 'ArrowDown' || event.key === 's') {
            keepDecelerating = true;
            while (keepDecelerating === true) {
                carSpeed = carSpeed - carAccelerationRate;
                if (carSpeed < minSpeed) {
                    carSpeed = minSpeed;
                }
                await sleep(10);
            }
        }
    }
    
    if (turnRightKeyIsDown === false) {
        if (event.key === 'ArrowRight' || event.key === 'd') {
            turnRightKeyIsDown = true;
            keepTurningRight = true;
            while (keepTurningRight === true) {
                rotateCar(carNumber, rotationRate);
                await sleep(10);
            }
        }
    }
    
    if (turnLeftKeyIsDown === false) {
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            turnLeftKeyIsDown = true;
            keepTurningLeft = true;
            while (keepTurningLeft === true) {
                rotateCar(carNumber, -rotationRate);
                await sleep(10);
            }
        }
    }
    
}, false);

// Used to cancel the above event
document.addEventListener('keyup', function(event) {
    // console.log(event);
    if (event.key === 'ArrowUp' || event.key === 'w') {
        accelerateKeyIsDown = false;
        keepAccelerating = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        decelerateKeyIsDown = false;
        keepDecelerating = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        turnRightKeyIsDown = false;
        keepTurningRight = false;
    }
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        turnLeftKeyIsDown = false;
        keepTurningLeft = false;
    }
}, false);

window.addEventListener('resize', function(event) {
    // console.log(event);
    let newWindowWidth = window.innerWidth;
    let newWindowHeight = window.innerHeight;
    if (screenWidth != newWindowWidth || screenHeight != newWindowHeight) {
        document.getElementById('root').innerHTML = `
            <div style="width: `+(newWindowWidth * 0.5).toString()+`px;" class="game-size-change">
                <p class="screen-size-change-warning">The screen dimensions have changed.</p>
                <p onclick="run();" class="reset-game-width-change-button">Reset Game</p>
            </div>`;
    }
});