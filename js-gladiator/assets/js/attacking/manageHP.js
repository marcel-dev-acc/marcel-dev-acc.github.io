import { sleep } from '../utils/utils.js';

async function decrementHP(targetHP, oldHP, HP) {
    let workingHP = oldHP;
    while (workingHP > HP) {
        workingHP = workingHP - 0.1;
        document.getElementById(targetHP).value = workingHP;
        await sleep(25);
    }
}

export { decrementHP };