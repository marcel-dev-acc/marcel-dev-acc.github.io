import { setActiveAttack } from '../attacking/setActiveAttack.js';
import { sleep } from '../utils/utils.js';

function downButtonSetup() {
    document.getElementById("game-nav-vertical-2").addEventListener("click", async function() {
        console.log("DOWN PRESS");
        setActiveAttack("DOWN PRESS");
        document.getElementById("game-nav-vertical-2").className = "nes-container is-rounded is-dark";
        document.getElementById("game-nav-vertical-2").className = "nes-container is-rounded is-dark animate__animated animate__pulse";
        await sleep(500);
        document.getElementById("game-nav-vertical-2").className = "nes-container is-rounded is-dark";
    });
}

export { downButtonSetup };