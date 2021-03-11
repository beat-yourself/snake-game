import { onSnake, expandSnake } from './snake.js';

export const GRID_SIZE = 31 ;
let food = getRandomFood();
const EXPANSION_RATE = 1;

export function update() {
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE);
        food = getRandomFood();
    }
}

export function draw(gameBoard, theme) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
    if(theme) {
        foodElement.style.background = 'rgb(0, 60, 255)';
        foodElement.style.border = '.25vmin black solid';
    }
}

function getRandomFood() {
    let randomFood;
    while (randomFood == null || onSnake(randomFood)) {
        randomFood = {
            x: Math.floor(Math.random() * GRID_SIZE) + 1,
            y: Math.floor(Math.random() * GRID_SIZE) + 1
        }
    }
    return randomFood;
}