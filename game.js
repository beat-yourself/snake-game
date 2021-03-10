import { SNAKE_SPEED, draw as drawSnake, update as updateSnake, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood, GRID_SIZE } from './food.js'

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
    if(isDead()) {
        if(confirm('You Lose. Press OK to restart.'))
            window.location = '/';
        return;
    }
    window.requestAnimationFrame(main);
    currentTime /= 1000;
    if(currentTime - lastRenderTime < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;   

    updateSnake();
    updateFood();
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

window.requestAnimationFrame(main);

function isDead() {
    return outsideGrid(getSnakeHead()) || snakeIntersection();
}

function outsideGrid(pos) {
    return pos.x < 1 || pos.x > GRID_SIZE || pos.y < 1 || pos.y > GRID_SIZE;
}