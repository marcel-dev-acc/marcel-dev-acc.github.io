let continueScrollTop = true;
let continueScrollDown = true;
let continueScrollRight = true;
let continueScrollLeft = true;
const scrollSpeed = 40;

function addEventListeners() {
    var bottomScroll = document.getElementById('bottom-scroll');
    bottomScroll.addEventListener('mouseenter', startBottomScrollDown);
    bottomScroll.addEventListener('mouseleave', stopBottomScrollDown);

    var topScroll = document.getElementById('top-scroll');
    topScroll.addEventListener('mouseenter', startTopScrollUp);
    topScroll.addEventListener('mouseleave', stopTopScrollUp);

    var rightScroll = document.getElementById('right-scroll');
    rightScroll.addEventListener('mouseenter', startRightScrollRight);
    rightScroll.addEventListener('mouseleave', stopRightScrollRight);

    var leftScroll = document.getElementById('left-scroll');
    leftScroll.addEventListener('mouseenter', startLeftScrollLeft);
    leftScroll.addEventListener('mouseleave', stopLeftScrollLeft);
}


async function startBottomScrollDown() {
    continueScrollDown = true;
    while (continueScrollDown === true) {
        window.scrollBy(0, scrollSpeed);
        await sleep(100);
    }
}

async function stopBottomScrollDown() {
    continueScrollDown = false;
}

async function startTopScrollUp() {
    continueScrollTop = true;
    while (continueScrollTop === true) {
        window.scrollBy(0, -scrollSpeed);
        await sleep(100);
    }
}

async function stopTopScrollUp() {
    continueScrollTop = false;
}

async function startRightScrollRight() {
    continueScrollRight = true;
    while (continueScrollRight === true) {
        window.scrollBy(scrollSpeed, 0);
        await sleep(100);
    }
}

async function stopRightScrollRight() {
    continueScrollRight = false;
}

async function startLeftScrollLeft() {
    continueScrollLeft = true;
    while (continueScrollLeft === true) {
        window.scrollBy(-scrollSpeed, 0);
        await sleep(100);
    }
}

async function stopLeftScrollLeft() {
    continueScrollLeft = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}