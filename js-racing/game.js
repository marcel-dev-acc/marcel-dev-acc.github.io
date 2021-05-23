/* Game code here */

const gameWidth = 800;
const gameHeight = 800;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let gameTop = (screenHeight / 2) - (gameHeight / 2);
console.log(gameTop);
let gameBottom = (screenHeight / 2) + (gameHeight / 2);
console.log(gameBottom);
let gameLeft = (screenWidth / 2) - (gameWidth / 2);
console.log(gameLeft);
let gameRight = (screenWidth / 2) + (gameWidth / 2);
console.log(gameRight);

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
    if (setGameArea()) {
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

function createCar(i) {
    let carWidth = 100;
    let carHeight = 100;
    zIndex = i * 10;
    document.getElementById('root').innerHTML += '<div id="car-'+i.toString()+'" class="car"></div>';
    document.getElementById('car-'+i.toString()).style.zIndex = zIndex;
    document.getElementById('car-'+i.toString()).style.left = (gameLeft + carWidth).toString() + 'px';
    document.getElementById('car-'+i.toString()).style.bottom = (gameTop + carHeight).toString() + 'px';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function carMoveLoop() {
    while (true) {
        moveCar(carNumber, carSpeed)
        await sleep(1);
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
        y = 2 ^ 0.5 / 2 * speed * 0.5;
        x = 2 ^ 0.5 / 2 * speed * 0.5;
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
        y = -1 * 2 ^ 0.5 / 2 * speed * 0.5;
        x = 2 ^ 0.5 / 2 * speed * 0.5;
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
        y = -1 * 2 ^ 0.5 / 2 * speed * 0.5;
        x = -1 * 2 ^ 0.5 / 2 * speed * 0.5;
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
        y = 2 ^ 0.5 / 2 * speed * 0.5;
        x = -1 * 2 ^ 0.5 / 2 * speed * 0.5;
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
    console.log(currentRotation);
    document.getElementById('car-'+i.toString()).style.transform = 'rotate('+currentRotation.toString()+'deg)';
}

document.addEventListener('keydown', function(event) {
    // console.log(event);
    if (event.key === 'ArrowUp' || event.key === 'w') {
        // console.log('ArrowUp');
        // if (carAccelerationRate < 0) {
        //     carAccelerationRate = 0;
        // }
        // if (carAccelerationRate < maxAcceleration) {
        //     carAccelerationRate += carAccelerationRate;
        // }
        carSpeed = carSpeed + carAccelerationRate;
        if (carSpeed > maxSpeed) {
            carSpeed = maxSpeed;
        }
        console.log(carSpeed);
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        // console.log('ArrowDown');
        // if (carAccelerationRate > 0) {
        //     carAccelerationRate = 0;
        // }
        // if (carAccelerationRate > maxDeceleration) {
        //     carAccelerationRate -= carAccelerationRate;
        // }
        carSpeed = carSpeed - carAccelerationRate;
        if (carSpeed < minSpeed) {
            carSpeed = minSpeed;
        }
        console.log(carSpeed);
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        // console.log('ArrowRight');
        rotateCar(carNumber, rotationRate);
    }
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        // console.log('ArrowLeft');
        rotateCar(carNumber, -rotationRate);
    }
}, false);