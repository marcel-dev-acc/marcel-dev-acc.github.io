function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackOutCanvasFromTop() {
    
    let canvas = document.getElementById("game-canvas");
    let context = canvas.getContext("2d");

    // Get canvas height and width
    let canvHeight = canvas.height;
    let canvWidth = canvas.width;

    // Set block fill colour
    context.fillStyle = '#000000';
    let blockSize = 30;

    // Loop through height blocks
    for (let i = 0; i < (canvas.height / blockSize); i++) {
        for (let j = 0; j < (canvas.width); j++) {
            // Fill by x,y => width,height
            context.fillRect(j, (i * blockSize), blockSize, blockSize);
            await sleep(1);
        }
    }
}

async function blackOutCanvasFromBottom() {
    
    let canvas = document.getElementById("game-canvas");
    let context = canvas.getContext("2d");

    // Get canvas height and width
    let canvHeight = canvas.height;
    let canvWidth = canvas.width;

    // Set block fill colour
    context.fillStyle = '#000000';
    let blockSize = 30;

    // Loop through height blocks
    for (let i = 0; i < (canvHeight / blockSize); i++) {
        for (let j = 0; j < canvWidth; j++) {
            // Fill by x,y => width,height
            context.fillRect(
                canvWidth - (j + blockSize),
                canvHeight - blockSize - (i * blockSize),
                blockSize,
                blockSize
            );
            await sleep(1);
        }
    }
}


async function blackOutCanvas() {
    blackOutCanvasFromTop();
    blackOutCanvasFromBottom();
    await sleep(4500);
}

export { sleep, blackOutCanvas };