import { setVar, getVar } from '../utils/manageVariables.js';
import { sleep } from '../utils/utils.js';

async function startBattle() {

    document.getElementById("game-stats-placeholder").style.display = "none";
    document.getElementById("game-stats").className = "m-2 animate__animated animate__fadeInLeft";
    document.getElementById("game-stats").style.display = "block";

    document.getElementById("game-view-placeholder").style.display = "none";
    document.getElementById("game-view").className = "m-2 animate__animated animate__fadeInLeft";
    document.getElementById("game-view").style.display = "block";

    let canvas = document.getElementById("game-canvas");
    let context = canvas.getContext("2d");
    let image = document.getElementById("gladiator-opponent");
    let background = document.getElementById("sand-background");
    let player = document.getElementById("player-back-of-head-helmet");
    let loopSX = [5, 37, 69, 101, 133];

    let reloadRate = 150;

    let runAnimation = true;
    setVar('runAnimation', runAnimation);

    while (runAnimation == true) {
        for (let i = 0; i < loopSX.length; i++) {
            // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Background for player
            context.drawImage(background, 185, 145);
            // Background for opponent
            context.drawImage(background, 20, 45);
            // Draw player
            context.drawImage(player, 0, 0, player.width, player.height, 230, 125, player.width * 0.3, player.height * 0.15);
            // Draw opponent
            context.drawImage(image, loopSX[i], 5, 30, 30, 70, 0, 90, 90);

            await sleep(reloadRate);
                    
        }
        runAnimation = getVar('runAnimation');
    }
}

export { startBattle };