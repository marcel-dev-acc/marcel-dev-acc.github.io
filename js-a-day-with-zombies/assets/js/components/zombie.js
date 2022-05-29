let zombieLevel = 1;
let zombies = [];

let zombieLevel1Radius = 10;
let zombieLevel1Movement = 1;


async function renderZombie(zombieDetails) {
    let canvas = document.getElementById('root');
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    let centerX = zombieDetails.zombieX;
    let centerY = zombieDetails.zombieY;
    let radius = zombieDetails.zombieRadius;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
}

// main control function
async function renderZombies(playerDetails) {
    // create zombies
    await createZombies();

    // move zombies towards player
    zombies = await zombieChase(playerDetails);
    
    // render list of zombies
    for (let i = 0; i < zombies.length; i++) {
        renderZombie(zombies[i]);
    }

}

async function createZombies() {
    while (zombies.length < zombieLevel * 10) {
        let zombieLevelRadius = zombieLevel1Radius;
        let randomX = Math.random() * window.innerWidth - zombieLevelRadius * 2;
        let randomY = Math.random() * window.innerHeight - zombieLevelRadius * 2;
        let zombieDetails = {
            zombieX: randomX,
            zombieY: randomY,
            zombieRadius: zombieLevelRadius,
            zombieChase: false
        };
        zombies.push(zombieDetails);
    }
}

async function zombieChase(playerDetails) {
    // move zombies towards player
    for (let i = 0; i < zombies.length; i++) {
        // validate if zombie is in ear shot
        if (
            zombies[i].zombieX < playerDetails.playerX + playerDetails.playerFootStepSoundDistance / 2
            &&
            zombies[i].zombieX > playerDetails.playerX - playerDetails.playerFootStepSoundDistance / 2
            &&
            zombies[i].zombieY < playerDetails.playerY + playerDetails.playerFootStepSoundDistance / 2
            &&
            zombies[i].zombieY > playerDetails.playerY - playerDetails.playerFootStepSoundDistance / 2
        ) {
            zombies[i].zombieChase = true;
            // chase in x
            if (zombies[i].zombieX > playerDetails.playerX) {
                // check if other zombies occupy space already
                // let skipMovement = false;
                // for (let j = 0; j < zombies.length; j++) {
                //     if (i == j) {
                //         continue;
                //     } else {
                //         if (
                //             // validate zombie x is not between other zombie x
                //             zombies[i].zombieX < zombies[j].zombieX + zombieLevel1Radius
                //             &&
                //             zombies[i].zombieX > zombies[j].zombieX - zombieLevel1Radius
                //             &&
                //             zombies[i].zombieY < zombies[j].zombieY + zombieLevel1Radius
                //             &&
                //             zombies[i].zombieY > zombies[j].zombieY - zombieLevel1Radius
                //         ) {
                //             skipMovement = true;
                //         }
                //     }
                // }
                // if (skipMovement) {
                //     continue;
                // }
                // move zombie by increment
                zombies[i].zombieX = zombies[i].zombieX - zombieLevel1Movement;
            } else {
                zombies[i].zombieX = zombies[i].zombieX + zombieLevel1Movement;
            }
            // chase in y
            if (zombies[i].zombieY > playerDetails.playerY) {
                zombies[i].zombieY = zombies[i].zombieY - zombieLevel1Movement;
            } else {
                zombies[i].zombieY = zombies[i].zombieY + zombieLevel1Movement;
            }
        // Zombie has the sent of player and chases' regardless
        } else if (zombies[i].zombieChase == true) {
            // chase in x
            if (zombies[i].zombieX > playerDetails.playerX) {
                zombies[i].zombieX = zombies[i].zombieX - zombieLevel1Movement;
            } else {
                zombies[i].zombieX = zombies[i].zombieX + zombieLevel1Movement;
            }
            // chase in y
            if (zombies[i].zombieY > playerDetails.playerY) {
                zombies[i].zombieY = zombies[i].zombieY - zombieLevel1Movement;
            } else {
                zombies[i].zombieY = zombies[i].zombieY + zombieLevel1Movement;
            }
        }
        
    }
    return zombies;
}

export { renderZombies };