import { sleep } from '../utils/utils.js';

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

export { incrementXP };