/* Game code here */

// Set local variables
let runAnimation = true;

let attacks = {
    1: {
        "name": "Spit",
        "damage": 0,
        "special": 0.5,
    },
    2: {
        "name": "Swing Sword",
        "damage": 10,
        "special": 0,
    },
    3: {
        "name": "Throw Rock",
        "damage": 5,
        "special": 0,
    },
    4: {
        "name": "Punch",
        "damage": 1,
        "special": 0,
    },
};

let activeAttack = 1;
let opponentHP;
let playerHP;

// General functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Game load function
function setup() {

    // Up Button
    document.getElementById("game-nav-vertical-1").addEventListener("click", async function() {
        console.log("UP PRESS");
        setActiveAttack("UP PRESS");
        document.getElementById("game-nav-vertical-1").className = "nes-container is-rounded is-dark";
        document.getElementById("game-nav-vertical-1").className = "nes-container is-rounded is-dark animate__animated animate__pulse";
        await sleep(500);
        document.getElementById("game-nav-vertical-1").className = "nes-container is-rounded is-dark";
    });

    // Down Button
    document.getElementById("game-nav-vertical-2").addEventListener("click", async function() {
        console.log("DOWN PRESS");
        setActiveAttack("DOWN PRESS");
        document.getElementById("game-nav-vertical-2").className = "nes-container is-rounded is-dark";
        document.getElementById("game-nav-vertical-2").className = "nes-container is-rounded is-dark animate__animated animate__pulse";
        await sleep(500);
        document.getElementById("game-nav-vertical-2").className = "nes-container is-rounded is-dark";
    });

    // Left Button
    document.getElementById("game-nav-horizontal-1").addEventListener("click", async function() {
        console.log("LEFT PRESS");
        setActiveAttack("LEFT PRESS");
        document.getElementById("game-nav-horizontal-1").className = "nes-container is-rounded is-dark";
        document.getElementById("game-nav-horizontal-1").className = "nes-container is-rounded is-dark animate__animated animate__pulse";
        await sleep(500);
        document.getElementById("game-nav-horizontal-1").className = "nes-container is-rounded is-dark";
    });

    // Right Button
    document.getElementById("game-nav-horizontal-2").addEventListener("click", async function() {
        console.log("RIGHT PRESS");
        setActiveAttack("RIGHT PRESS");
        document.getElementById("game-nav-horizontal-2").className = "nes-container is-rounded is-dark";
        document.getElementById("game-nav-horizontal-2").className = "nes-container is-rounded is-dark animate__animated animate__pulse";
        await sleep(500);
        document.getElementById("game-nav-horizontal-2").className = "nes-container is-rounded is-dark";
    });

    // A Button
    document.getElementById("A-button").addEventListener("click", function() {
        console.log("A PRESS");
        submitAttack();
    });

    // B Button
    document.getElementById("B-button").addEventListener("click", function() {
        console.log("B PRESS");
    });

    // Set total HP
    opponentHP = 10
    document.getElementById("opponent-hp").max = opponentHP;
    playerHP = 10;
    document.getElementById("player-hp").max = playerHP;

    startBattle();

    // testing
    

}

async function submitAttack() {
    document.getElementById("game-canvas").className = "animate__animated animate__headShake";

    // Calculate damage
    // console.log(attacks[activeAttack]);
    opponentHP = opponentHP - attacks[activeAttack]["damage"];
    document.getElementById("opponent-hp").value = opponentHP;

    let opponentMaxHp = document.getElementById("opponent-hp").max;

    if (opponentHP >= opponentMaxHp * 0.20 && opponentHP <= opponentMaxHp * 0.45) {
        document.getElementById("opponent-hp").className = "nes-progress is-warning";
    } else if (opponentHP >= 0 && opponentHP <= opponentMaxHp * 0.20) {
        document.getElementById("opponent-hp").className = "nes-progress is-error";
    }

    await sleep(500);
    document.getElementById("game-canvas").className = "animate__animated";

    calculateIfDead();
}

async function calculateIfDead() {
    if (opponentHP <= 0) {
        runAnimation = false;
        await sleep(500);

        let canvas = document.getElementById("game-canvas");
        let context = canvas.getContext("2d");
        let image = document.getElementById("gladiator-opponent");
        let background = document.getElementById("sand-background");
        let player = document.getElementById("player-back-of-head-helmet");

        let loopSX = [5, 37, 69, 101, 133, 163, 195];

        let reloadRate = 200;

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
            context.drawImage(image, loopSX[i], 133, 29, 30, 70, 0, 90, 90);

            await sleep(reloadRate);
                    
        }
    }
}

async function startBattle() {
    let canvas = document.getElementById("game-canvas");
    let context = canvas.getContext("2d");
    let image = document.getElementById("gladiator-opponent");
    let background = document.getElementById("sand-background");
    let player = document.getElementById("player-back-of-head-helmet");
    let loopSX = [5, 37, 69, 101, 133];

    let reloadRate = 150;

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
    }
}

function setActiveAttack(press) {
    if (press == "UP PRESS") {
        if (activeAttack == 1) {
            // do nothing - can't go up
        } else if (activeAttack == 2) {
            // do nothing - can't go up
        } else if (activeAttack == 3) {
            activeAttack = 1;
            document.getElementById("attack-option-3").className = "attack-options";
            document.getElementById("attack-option-1").className = "attack-options active-attack";
        } else if (activeAttack == 4) {
            activeAttack = 2;
            document.getElementById("attack-option-4").className = "attack-options";
            document.getElementById("attack-option-2").className = "attack-options active-attack";
        }
    } else if (press == "DOWN PRESS") {
        if (activeAttack == 1) {
            activeAttack = 3;
            document.getElementById("attack-option-1").className = "attack-options";
            document.getElementById("attack-option-3").className = "attack-options active-attack";
        } else if (activeAttack == 2) {
            activeAttack = 4;
            document.getElementById("attack-option-2").className = "attack-options";
            document.getElementById("attack-option-4").className = "attack-options active-attack";
        } else if (activeAttack == 3) {
            // do nothing - can't go up
        } else if (activeAttack == 4) {
            // do nothing - can't go up
        }
    } else if (press == "LEFT PRESS") {
        if (activeAttack == 1) {
            // do nothing - can't go up
        } else if (activeAttack == 2) {
            activeAttack = 1;
            document.getElementById("attack-option-2").className = "attack-options";
            document.getElementById("attack-option-1").className = "attack-options active-attack";
        } else if (activeAttack == 3) {
            // do nothing - can't go up
        } else if (activeAttack == 4) {
            activeAttack = 3;
            document.getElementById("attack-option-4").className = "attack-options";
            document.getElementById("attack-option-3").className = "attack-options active-attack";
        }
    } else if (press == "RIGHT PRESS") {
        if (activeAttack == 1) {
            activeAttack = 2;
            document.getElementById("attack-option-1").className = "attack-options";
            document.getElementById("attack-option-2").className = "attack-options active-attack";
        } else if (activeAttack == 2) {
            // do nothing - can't go up
        } else if (activeAttack == 3) {
            activeAttack = 4;
            document.getElementById("attack-option-3").className = "attack-options";
            document.getElementById("attack-option-4").className = "attack-options active-attack";
        } else if (activeAttack == 4) {
            // do nothing - can't go up
        }
    } else {
        alert("Not a recognised press");
    }
}

