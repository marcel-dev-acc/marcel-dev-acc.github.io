import { sleep } from '../utils/utils.js';
import { setVar, getVar } from '../utils/manageVariables.js';
import { startBattle } from '../battle/startBattle.js';
import { submitAttack, opponentReturnAttack } from '../attacking/attacking.js';

function aButtonSetup() {
    document.getElementById("A-button").addEventListener("click", async function() {
        console.log("A PRESS");
        // Get working variables
        let activeWindow = getVar('activeWindow');
        let processesBlocked = getVar('processesBlocked');
        console.log(activeWindow);
        // Block any further process from happening until run is complete
        // **NB** Processed can get blocked in while loop with an await
        if (processesBlocked == true) {
            console.log("Processes blocked due to currently running process");
            return false;
        }
        processesBlocked = true;

        if (activeWindow == "battle-dialogue") {
            // Set total HP
            let opponentHP = 10
            setVar('opponentHP', opponentHP);
            document.getElementById("opponent-hp").className = "nes-progress is-success";
            document.getElementById("opponent-hp").value = opponentHP;
            document.getElementById("opponent-hp").max = opponentHP;
            let playerHP = 10;
            setVar('playerHP', playerHP);
            document.getElementById("player-hp").max = playerHP;

            // Setup player XP
            let playerLevel = getVar('playerLevel');
            document.getElementById("player-xp").max = playerLevel * 15;
            let playerXP = getVar('playerXP');
            document.getElementById("player-xp").value = playerXP;

            // Setup player level
            document.getElementById("player-level").innerHTML = playerLevel;

            // Set active attack to 1
            let activeAttack = 1
            setVar('activeAttack', activeAttack);
            document.getElementById("attack-option-2").className = "attack-options";
            document.getElementById("attack-option-3").className = "attack-options";
            document.getElementById("attack-option-4").className = "attack-options";
            document.getElementById("attack-option-1").className = "attack-options active-attack";

            // Show attack menu
            document.getElementById("battle-dialogue-section").style.display = "none";
            document.getElementById("attack-selection-menu").style.display = "block";
            activeWindow = "attack-selection";
            // start the game base animation
            startBattle();
            await sleep(1000);
        } else if (activeWindow == "win-lose-dialogue") {
            let opponentNames = getVar('opponentNames');
            let namePick = parseInt( Math.random() * opponentNames.length );
            document.getElementById("dialogue-text").innerHTML = opponentNames[namePick] + " is challenging you to a battle. Beat " + opponentNames[namePick] + " for the glory of Greece!";
            activeWindow = "battle-dialogue";
        } else if (activeWindow == "attack-selection") {
            await submitAttack();
            console.log("finished submit attack");
            await sleep(500);
            await opponentReturnAttack();
        }
        
        // Unblock processes as this run is complete
        processesBlocked = false;
        console.log(activeWindow);
        setVar('activeWindow', activeWindow);
        setVar('processesBlocked', processesBlocked);
    });
}

export { aButtonSetup };
