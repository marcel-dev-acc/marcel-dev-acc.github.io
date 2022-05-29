import { sleep } from './utils.js';

// Player variables
let playerRadius = 10;
let playerX = window.innerWidth / 2 - playerRadius / 2;
let playerY = window.innerHeight / 2 - playerRadius / 2;
let playerFootStepSoundDistance = 200;

let movementPx = 2;

let upKeyPress = false;
let downKeyPress = false;
let leftKeyPress = false;
let rightKeyPress = false;

async function renderPlayer() {
    let canvas = document.getElementById('root');
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    let centerX = playerX;
    let centerY = playerY;
    let radius = playerRadius;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    return {
        playerX: playerX,
        playerY: playerY,
        playerFootStepSoundDistance: playerFootStepSoundDistance
    };
}

async function addButtonPressEventListeners() {
    document.addEventListener("keydown", async function(event) {
        // console.log(event);
        // up
        if (event.key == 'w') {
            if (!upKeyPress) {
                upKeyPress = true;
                while (upKeyPress) {
                    playerY = playerY - movementPx;
                    await sleep(10);
                }
            }
            
        // down
        } else if (event.key == 's') {
            if (!downKeyPress) {
                downKeyPress = true;
                while (downKeyPress) {
                    playerY = playerY + movementPx;
                    await sleep(10);
                }
            }
            
        // left
        } else if (event.key == 'a') {
            if (!leftKeyPress) {
                leftKeyPress = true;
                while (leftKeyPress) {
                    playerX = playerX - movementPx;
                    await sleep(10);
                }
            }
            
        // right
        } else if (event.key == 'd') {
            if (!rightKeyPress) {
                rightKeyPress = true;
                while (rightKeyPress) {
                    playerX = playerX + movementPx;
                    await sleep(10);
                }
            }
            
        }
    });

    document.addEventListener("keyup", function(event) {
        // console.log(event);
        // up
        if (event.key == 'w') {
            upKeyPress = false;
            
        // down
        } else if (event.key == 's') {
            downKeyPress = false;

        // left
        } else if (event.key == 'a') {
            leftKeyPress = false;

        // right
        } else if (event.key == 'd') {
            rightKeyPress = false;
        }
    });
}

export { addButtonPressEventListeners, renderPlayer };
