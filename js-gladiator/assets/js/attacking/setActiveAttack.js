import { setVar, getVar } from '../utils/manageVariables.js';

function setActiveAttack(press) {
    let activeAttack = getVar('activeAttack');
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
    setVar('activeAttack', activeAttack);
}

export { setActiveAttack };
