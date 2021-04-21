/* Game code here */
let quit_game = false;
// Game variables below
const board_border = 'black';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
];

let score = 0;
// True if changing direction
let changing_direction = false;

let food_x;
let food_y;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

function configure_page() {
    // console.log(window.innerWidth);
    const page = document.getElementById('main');
    page.style.width = (window.innerWidth - 2).toString() + 'px';
    page.style.height = (window.innerHeight - 2).toString() + 'px';
    let game_board = document.getElementById('snakeboard');
    if (window.innerWidth - 20 > 800) {
        var window_width = 800;
    } else {
        var window_width = window.innerWidth - 20;
    }
    game_board.style.width = (window.innerWidth - 20).toString() + 'px';
    game_board.style.height = (window.innerHeight * 0.60).toString() + 'px';
    game_board.width = (window.innerWidth - 20);
    game_board.height = (window.innerHeight * 0.60);
}

function ready_game_screen() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('game-box').style.display = 'block';
    game_main();
}


function reset_game_screen() {
    quit_game = true;
    document.getElementById('score').innerHTML = (0).toString();
    snake = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200},
        {x: 160, y: 200}
    ];
    configure_page();
    ready_game_screen();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function game_main() {
    const snakeboard = document.getElementById("snakeboard");
    const snakeboard_ctx = snakeboard.getContext("2d");
    clear_board(snakeboard_ctx);
    await sleep(500);

    var board_max_width = parseInt((snakeboard.style.width).replace('px', ''));
    var board_max_height = parseInt((snakeboard.style.height).replace('px', ''));
    // console.log(board_max_width);
    // console.log(board_max_height);

    snakeboard_ctx.font = "100px Arial";
    snakeboard_ctx.fillText("3", ((board_max_width / 2) - 25), ((board_max_height / 2) - 0));
    await sleep(1000);

    clear_board(snakeboard_ctx);
    snakeboard_ctx.fillText("2", ((board_max_width / 2) - 25), ((board_max_height / 2) - 0));
    await sleep(1000);

    clear_board(snakeboard_ctx);
    snakeboard_ctx.fillText("1", ((board_max_width / 2) - 25), ((board_max_height / 2) - 0));
    await sleep(1000);

    clear_board(snakeboard_ctx);
    snakeboard_ctx.fillText("Go", ((board_max_width / 2) - 75), ((board_max_height / 2) - 0));

    await sleep(1000);
    clear_board(snakeboard_ctx);

    generate_food_block(snakeboard);

    document.getElementById('press-up').addEventListener('click', change_direction_up);
    document.getElementById('press-down').addEventListener('click', change_direction_down);
    document.getElementById('press-left').addEventListener('click', change_direction_left);
    document.getElementById('press-right').addEventListener('click', change_direction_right);

    quit_game = false;
    game_ended = false;
    while (quit_game == false && game_ended == false) {
        changing_direction = false;
        clear_board(snakeboard_ctx);
        draw_food(snakeboard_ctx);
        move_snake(snakeboard);
        draw_snake(snakeboard_ctx);

        await sleep(100);
        game_ended = has_game_ended();

        // quit_game = true; // Delete when not in testing
    }


}

function clear_board(snakeboard_ctx) {
    snakeboard_ctx.fillStyle = 'white';
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.fillStyle = 'black';
}

function generate_food_block(snakeboard) {
    food_x = random_number(0, snakeboard.width - 10);
    food_y = random_number(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten == true) {
            generate_food_block();
        }
    });
}

function draw_food(snakeboard_ctx) {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function random_number(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function move_snake(snakeboard) {
    // Create the new Snake's head
    var head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    var has_eaten_food = snake[0].x == food_x && snake[0].y == food_y;
    if (has_eaten_food == true) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score.toString();
        // Generate new food location
        generate_food_block(snakeboard);
    } else {
        // Remove the last part of snake body
        snake.pop();
    }
}

function draw_snake(snakeboard_ctx) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    for (var i = 0; i < snake.length; i++) {
        snakeboard_ctx.fillRect(snake[i]['x'], snake[i]['y'], 10, 10);
        snakeboard_ctx.strokeRect(snake[i]['x'], snake[i]['y'], 10, 10);
    }
}

function has_game_ended() {
    for (var i = 4; i < snake.length; i++) {
        if (snake[i]['x'] === snake[0]['x'] && snake[i]['y'] === snake[0]['y']) {
            return true;
        }
    }
    let hitLeftWall = snake[0]['x'] < 0;
    let hitRightWall = snake[0]['x'] > snakeboard.width - 10;
    let hitToptWall = snake[0]['y'] < 0;
    let hitBottomWall = snake[0]['y'] > snakeboard.height - 10;
    if (hitLeftWall) {
        return true;
    }
    if (hitRightWall) {
        return true;
    }
    if (hitToptWall) {
        return true;
    }
    if (hitBottomWall) {
        return true;
    }
    return false;
}

function change_direction_up() {
    if (changing_direction == true) {return;}
    changing_direction = true;
    const goingDown = dy === 10;
    if (goingDown == false) {
        dx = 0;
        dy = -10;
    }
}

function change_direction_down() {
    if (changing_direction == true) {return;}
    changing_direction = true;
    const goingUp = dy === -10;
    if (goingUp == false) {
        dx = 0;
        dy = 10;
    }
}

function change_direction_left() {
    if (changing_direction == true) {return;}
    changing_direction = true;
    const goingRight = dx === 10;
    if (goingRight == false) {
        dx = -10;
        dy = 0;
    }
}

function change_direction_right() {
    if (changing_direction == true) {return;}
    changing_direction = true;
    const goingLeft = dx === -10;
    if (goingLeft == false) {
        dx = 10;
        dy = 0;
    }
}


// function change_direction(event) {
//     const LEFT_KEY = 37;
//     const RIGHT_KEY = 39;
//     const UP_KEY = 38;
//     const DOWN_KEY = 40;
    
//     // Prevent the snake from reversing

//     if (changing_direction) {return;}
//     changing_direction = true;
//     const keyPressed = event.keyCode;
//     const goingUp = dy === -10;
//     const goingDown = dy === 10;
//     const goingRight = dx === 10;
//     const goingLeft = dx === -10;
//     if (keyPressed === LEFT_KEY && !goingRight) {
//         dx = -10;
//         dy = 0;
//     }
//     if (keyPressed === UP_KEY && !goingDown) {
//         dx = 0;
//         dy = -10;
//     }
//     if (keyPressed === RIGHT_KEY && !goingLeft) {
//         dx = 10;
//         dy = 0;
//     }
//     if (keyPressed === DOWN_KEY && !goingUp) {
//         dx = 0;
//         dy = 10;
//     }
// }
