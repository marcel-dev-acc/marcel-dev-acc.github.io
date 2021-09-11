import { sleep, blackOutCanvas } from '../utils/utils.js';
import { setVar, getVar } from '../utils/manageVariables.js';
import { incrementXP } from './manageXP.js';
import { decrementHP } from './manageHP.js';

async function submitAttack() {
    try {

        // Show dialogue of submitted attack
        let attacks = getVar('attacks');
        let activeAttack = getVar('activeAttack');
        let textToFill = 'You attack your opponent '.concat(
            attacks[activeAttack]['attacking_sentence']
        );
        document.getElementById('dialogue-text').innerHTML = '...';
        
        document.getElementById('attack-selection-menu').style.display = 'none';
        document.getElementById('battle-dialogue-section').style.display = 'block';

        await textFill(textToFill);

        // Animate the attack
        await sleep(2000);
        document.getElementById('game-canvas').className = 'animate__animated animate__headShake';

        // Calculate damage
        let opponentHP = getVar('opponentHP');
        let oldOpponentHP = opponentHP;
        opponentHP = opponentHP - attacks[activeAttack]['damage'];
        setVar('opponentHP', opponentHP);
        await decrementHP('opponent-hp', oldOpponentHP, opponentHP);

        // Colour warning of HP
        let opponentMaxHp = document.getElementById('opponent-hp').max;
        if (opponentHP >= opponentMaxHp * 0.20 && opponentHP <= opponentMaxHp * 0.45) {
            document.getElementById('opponent-hp').className = 'nes-progress is-warning';
        } else if (opponentHP >= 0 && opponentHP <= opponentMaxHp * 0.20) {
            document.getElementById('opponent-hp').className = 'nes-progress is-error';
        }

        await sleep(500);
        document.getElementById('game-canvas').className = 'animate__animated';

        calculateIfDead();
        

    } catch(error) {
        alert('Error on submitAttack');
        alert(error);
    }
}


async function opponentReturnAttack() {
    try {
        
        // First validate if the opponent has enough HP to inflict an attack
        let opponentHP = getVar('opponentHP');
        if (opponentHP <= 0) {
            return false;
        }

        // Opponent return attack

        // generate random attack choice number
        let randomSelection = Math.ceil( Math.random() * 4 );

        // Show dialogue of submitted attack
        let attacks = getVar('attacks');
        let textToFill = 'Your opponent attacks '.concat(
            attacks[randomSelection]['attacking_sentence']
        );
        document.getElementById('dialogue-text').innerHTML = '...';
        
        document.getElementById('attack-selection-menu').style.display = 'none';
        document.getElementById('battle-dialogue-section').style.display = 'block';


        await textFill(textToFill);

        // Animate the attack
        await sleep(2000);
        document.getElementById('game-canvas').className = 'animate__animated animate__headShake';

        // Calculate damage
        let playerHP = getVar('playerHP');
        let oldPlayerHP = playerHP;
        playerHP = playerHP - attacks[randomSelection]['damage'];
        setVar('playerHP', playerHP);
        await decrementHP('player-hp', oldPlayerHP, playerHP);

        // Colour warning of HP
        let playerMaxHp = document.getElementById('player-hp').max;
        if (playerHP >= playerMaxHp * 0.20 && playerHP <= playerMaxHp * 0.45) {
            document.getElementById('player-hp').className = 'nes-progress is-warning';
        } else if (playerHP >= 0 && playerHP <= playerMaxHp * 0.20) {
            document.getElementById('player-hp').className = 'nes-progress is-error';
        }

        await sleep(500);
        document.getElementById('game-canvas').className = 'animate__animated';

        if (playerHP > 0) {
            document.getElementById('battle-dialogue-section').style.display = 'none';
            document.getElementById('attack-selection-menu').style.display = 'block';
        } else {
            calculateIfDead();
        }
        

    } catch(error) {
        alert('Error on opponentReturnAttack');
        alert(error);
    }
}


async function textFill(textToFill) {
    await sleep(500);
    document.getElementById('dialogue-text').innerHTML = '';
    for (let i = 0; i < textToFill.length; i++) {
        document.getElementById('dialogue-text').innerHTML = document.getElementById('dialogue-text').innerHTML + textToFill[i];
        await sleep(100);
    }
}


async function calculateIfDead() {
    try {

        document.getElementById('game-stats').className = 'm-2';
        document.getElementById('game-view').className = 'm-2';

        let playerHP = getVar('playerHP');
        let opponentHP = getVar('opponentHP');

        if (opponentHP <= 0) {
    
            let runAnimation = false;
            setVar('runAnimation', runAnimation);
            await sleep(500);

            let canvas = document.getElementById('game-canvas');
            let context = canvas.getContext('2d');
            let image = document.getElementById('gladiator-opponent');
            let background = document.getElementById('sand-background');
            let player = document.getElementById('player-back-of-head-helmet');

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

            await calculateLevel();

            await sleep(2000);

            let activeWindow = 'win-lose-dialogue';
            setVar('activeWindow', activeWindow);
            document.getElementById('attack-selection-menu').style.display = 'none';
            document.getElementById('dialogue-text').innerHTML = '...';
            document.getElementById('battle-dialogue-section').style.display = 'block';

            let textToFill = 'Congratulations, you have destroyed your opponent!';
            await textFill(textToFill);

            await sleep(1000);

            document.getElementById('game-stats-placeholder').style.display = 'block';
            document.getElementById('game-stats').style.display = 'none';

            document.getElementById('game-view-placeholder').style.display = 'block';
            document.getElementById('game-view').style.display = 'none';

        } else if (playerHP <= 0) {
            
            document.getElementById('dialogue-text').innerHTML = '...';

            let runAnimation = false;
            setVar('runAnimation', runAnimation);

            await sleep(1000);

            await blackOutCanvas();

            let textToFill = 'Your opponent has destroyed you! You have no HP left and must rest before you can fight again...';
            await textFill(textToFill);

            document.getElementById('game-stats-placeholder').style.display = 'block';
            document.getElementById('game-stats').style.display = 'none';

            document.getElementById('game-view-placeholder').style.display = 'block';
            document.getElementById('game-view').style.display = 'none';

            await sleep(1000);

            let activeWindow = 'win-lose-dialogue';
            setVar('activeWindow', activeWindow);
        }

    } catch(error) {
        alert('Error on calculateIfDead');
        alert(error);
    }
    
}


async function calculateLevel() {
    try {

        let playerMaxXP = parseInt( document.getElementById('player-xp').max );
        let playerXP = getVar('playerXP');
        playerXP = playerXP + parseInt( document.getElementById('opponent-level').innerHTML ) * 2;
        let oldPlayerXP = parseInt( document.getElementById('player-xp').value );
        let playerLevel = getVar('playerLevel');

        if (playerXP > playerMaxXP) {
            let XPBeyondMax = playerXP - playerMaxXP;
            playerXP = XPBeyondMax;
            // Level up the player
            playerLevel++;
            // Setup player XP
            // Increment XP up to it max limit
            await incrementXP(oldPlayerXP, playerMaxXP);
            document.getElementById('player-level').innerHTML = playerLevel;
            // Increase the max XP
            document.getElementById('player-xp').max = playerLevel * 15;
            // Increment the XP the remainder of the way
            await incrementXP(0, XPBeyondMax);
        } else {
            await incrementXP(oldPlayerXP, playerXP);
        }
        setVar('playerXP', playerXP);
        setVar('playerLevel', playerLevel);

    } catch(error) {
        alert('Error on calculateLevel');
        alert(error);
    }
}


export { submitAttack, opponentReturnAttack };
