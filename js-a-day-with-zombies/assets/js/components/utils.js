function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function setSize() {
    let canvasDiv = document.getElementById('canvas-root');
    canvasDiv.style.width = window.innerWidth + 'px';
    canvasDiv.style.height = window.innerHeight + 'px';

    let canvas = document.getElementById('root');
    // Set canvas width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export { sleep, setSize };