import { sleep } from './utils.js';
import { renderPlayer } from './player.js';
import { renderZombies } from './zombie.js';

async function renderLoop() {
    while (true) {
        let canvas = document.getElementById('root');
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let playerDetails = await renderPlayer();
        await renderZombies(playerDetails);
        await sleep(1);
    }
}

export { renderLoop };