import { setSize } from './components/utils.js';
import { renderLoop } from './components/renderLoop.js';
import { addButtonPressEventListeners } from './components/player.js';

window.addEventListener('DOMContentLoaded', main);
window.addEventListener('resize', setSize);

async function main() {
    // set the size of the canvas
    setSize();

    // add button listeners
    addButtonPressEventListeners();

    // create a render loop
    renderLoop();
    
}

