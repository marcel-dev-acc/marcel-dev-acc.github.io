import { setActiveAttack } from '../attacking/setActiveAttack.js';
import { sleep } from '../utils/utils.js';

function upButtonSetup() {
    document.getElementById("game-nav-vertical-1").addEventListener("click", async function() {
        console.log("UP PRESS");
        setActiveAttack("UP PRESS");
        document.getElementById("game-nav-vertical-1").className = "nes-container is-rounded is-dark";
        document.getElementById("game-nav-vertical-1").className = "nes-container is-rounded is-dark animate__animated animate__pulse";
        await sleep(500);
        document.getElementById("game-nav-vertical-1").className = "nes-container is-rounded is-dark";
    });
}

export { upButtonSetup };