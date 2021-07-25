/* Game code here */

// Set local variables

let activeWindowOption = [
    "battle-dialogue",
    "attack-selection",
    "win-dialogue",
];
let activeWindow = "battle-dialogue";
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
let playerXP = 0;
let playerLevel = 1;

let opponentNames = [
    "Achilleas",
    "Adam",
    "Agapi",
    "Aimilios",
    "Charalampos",
    "Charilaos",
    "Christos",
    "Demetrios",
    "Diamanto",
    "Dimitris",
    "Dorotheos",
    "Efthymios",
];

// General functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Game load function
function setup() {
    try {

        document.getElementById("dialogue-text").innerHTML = "Gor is challenging you to a battle. Beat Gor for the glory of Greece!";

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
        document.getElementById("A-button").addEventListener("click", async function() {
            console.log("A PRESS");
            console.log(activeWindow);
            if (activeWindow == "battle-dialogue") {
                // Set total HP
                opponentHP = 10
                document.getElementById("opponent-hp").className = "nes-progress is-success";
                document.getElementById("opponent-hp").value = opponentHP;
                document.getElementById("opponent-hp").max = opponentHP;
                playerHP = 10;
                document.getElementById("player-hp").max = playerHP;

                // Setup player XP
                document.getElementById("player-xp").max = playerLevel * 15;
                document.getElementById("player-xp").value = playerXP;

                // Setup player level
                document.getElementById("player-level").innerHTML = playerLevel;

                // Set active attack to 1
                activeAttack = 1
                document.getElementById("attack-option-2").className = "attack-options";
                document.getElementById("attack-option-3").className = "attack-options";
                document.getElementById("attack-option-4").className = "attack-options";
                document.getElementById("attack-option-1").className = "attack-options active-attack";

                // Show attack menu
                document.getElementById("battle-dialogue-section").style.display = "none";
                document.getElementById("attack-selection-menu").style.display = "block";
                activeWindow = "attack-selection";
                // start the game base animation
                await startBattle();
            } else if (activeWindow == "win-dialogue") {
                let namePick = parseInt( Math.random() * opponentNames.length );
                document.getElementById("dialogue-text").innerHTML = opponentNames[namePick] + " is challenging you to a battle. Beat " + opponentNames[namePick] + " for the glory of Greece!";
                activeWindow = "battle-dialogue";
            } else if (activeWindow == "attack-selection") {
                await submitAttack();
                console.log("finished submit attack");
                await opponentReturnAttack();
            }
        });

        // B Button
        document.getElementById("B-button").addEventListener("click", function() {
            console.log("B PRESS");
        });

        
        // testing



    } catch(error) {
        alert("Error on setup");
        alert(error);
    }
    
    

}

async function decrementHP(targetHP, oldHP, HP) {
    let workingHP = oldHP;
    while (workingHP > HP) {
        workingHP = workingHP - 0.1;
        document.getElementById(targetHP).value = workingHP;
        await sleep(25);
    }
}

async function opponentReturnAttack() {
    try {
        
        console.log("going to return attack");
        document.getElementById("game-canvas").className = "animate__animated animate__headShake";

        // generate random attack choice number
        let randomSelection = Math.ceil( Math.random() * 4 );

        // Calculate damage
        let oldPlayerHP = playerHP;
        playerHP = playerHP - attacks[randomSelection]["damage"];
        await decrementHP("player-hp", oldPlayerHP, playerHP);

        // Colour warning of HP
        let playerMaxHp = document.getElementById("player-hp").max;
        if (playerHP >= playerMaxHp * 0.20 && playerHP <= playerMaxHp * 0.45) {
            document.getElementById("player-hp").className = "nes-progress is-warning";
        } else if (playerHP >= 0 && playerHP <= playerMaxHp * 0.20) {
            document.getElementById("player-hp").className = "nes-progress is-error";
        }

        await sleep(500);
        document.getElementById("game-canvas").className = "animate__animated";

    } catch(error) {
        alert("Error on opponentReturnAttack");
        alert(error);
    }
}

async function submitAttack() {
    try {

        document.getElementById("game-canvas").className = "animate__animated animate__headShake";

        // Calculate damage
        let oldOpponentHP = opponentHP;
        opponentHP = opponentHP - attacks[activeAttack]["damage"];
        await decrementHP("opponent-hp", oldOpponentHP, opponentHP);

        // Colour warning of HP
        let opponentMaxHp = document.getElementById("opponent-hp").max;
        if (opponentHP >= opponentMaxHp * 0.20 && opponentHP <= opponentMaxHp * 0.45) {
            document.getElementById("opponent-hp").className = "nes-progress is-warning";
        } else if (opponentHP >= 0 && opponentHP <= opponentMaxHp * 0.20) {
            document.getElementById("opponent-hp").className = "nes-progress is-error";
        }

        await sleep(500);
        document.getElementById("game-canvas").className = "animate__animated";

        calculateIfDead();

    } catch(error) {
        alert("Error on submitAttack");
        alert(error);
    }
}

async function calculateIfDead() {
    try {

        document.getElementById("game-stats").className = "m-2";
        document.getElementById("game-view").className = "m-2";

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

            await sleep(2000);

            calculateLevel();

            await sleep(2000);

            activeWindow = "win-dialogue";
            document.getElementById("attack-selection-menu").style.display = "none";
            document.getElementById("dialogue-text").innerHTML = "Congratulations, you have destroyed your opponent!";
            document.getElementById("battle-dialogue-section").style.display = "block";

            document.getElementById("game-stats-placeholder").style.display = "block";
            document.getElementById("game-stats").style.display = "none";

            document.getElementById("game-view-placeholder").style.display = "block";
            document.getElementById("game-view").style.display = "none";

            runAnimation = true;
        }

    } catch(error) {
        alert("Error on calculateIfDead");
        alert(error);
    }
    
}

async function incrementXP(oldPlayerXP, playerXP) {
    try {

        let workingXP = oldPlayerXP;
        while (workingXP < playerXP) {
            workingXP = workingXP + 0.1;
            document.getElementById("player-xp").value = workingXP;
            await sleep(25);
        }

    } catch(error) {
        alert("Error on incrementXP");
        alert(error);
    }
}

async function calculateLevel() {
    try {

        let playerMaxXP = parseInt( document.getElementById("player-xp").max );
        playerXP = playerXP + parseInt( document.getElementById("opponent-level").innerHTML ) * 2;
        let oldPlayerXP = parseInt( document.getElementById("player-xp").value );

        if (playerXP > playerMaxXP) {
            // Level up the player
            playerLevel++;
            // Setup player XP
            document.getElementById("player-xp").max = playerLevel * 15;
            await incrementXP(oldPlayerXP, (playerXP - playerMaxXP) );
            document.getElementById("player-level").innerHTML = playerLevel;
        } else {
            await incrementXP(oldPlayerXP, playerXP);
        }

    } catch(error) {
        alert("Error on calculateLevel");
        alert(error);
    }
}

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

