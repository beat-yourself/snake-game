import { SNAKE_SPEED, draw as drawSnake, update as updateSnake, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood, GRID_SIZE } from './food.js'

let lastRenderTime = 0;
let theme = 0; // 0 for Dark, 1 for Light

const gameBoard = document.getElementById('game-board');
const light = document.getElementById('light');
const dark = document.getElementById('dark');
const body = document.getElementsByTagName('body')[0];
const toggle = document.getElementById('toggle');
const toggleBtn = document.getElementById('toggleBtn');
const toggleCircle = document.getElementById('toggleCircle');

toggleBtn.addEventListener('click', () => {
    body.style.background = theme ? '#264653' : '#4c9d8f';
    gameBoard.style.background = theme ? 'rgb(5, 3, 3)' : '#ccc';
    (theme ? light : dark).classList.add('unselected');
    (!theme ? light : dark).classList.remove('unselected');
    theme ? toggleCircle.classList.add('toggled'):
            toggleCircle.classList.remove('toggled');
    toggle.style.backgroundColor = theme ? '#eb888b' : 'rgb(38 70 83)';
    dark.style.color = light.style.color =  theme ? 'black' : 'white';
    theme = 1 - theme;
})

function main(currentTime) {
    if(isDead()) {
        if(confirm('You Lose. Press OK to restart.'))
            window.location = window.location.href;
        return;
    }
    window.requestAnimationFrame(main);
    currentTime /= 1000;
    if(currentTime - lastRenderTime < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;   

    updateSnake();
    updateFood();
    drawSnake(gameBoard, theme);
    drawFood(gameBoard, theme);
}

window.requestAnimationFrame(main);

function isDead() {
    return outsideGrid(getSnakeHead()) || snakeIntersection();
}

function outsideGrid(pos) {
    return pos.x < 1 || pos.x > GRID_SIZE || pos.y < 1 || pos.y > GRID_SIZE;
}