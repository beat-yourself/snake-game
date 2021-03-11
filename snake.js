import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 9;
let newSeg = 0;

let snakeBody = [
    {x: 16, y: 16}
];

export function update() {
    addSegments(newSeg);

    let direction = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;
}

export function draw(gameBoard, theme) {
    gameBoard.innerHTML = '';
    snakeBody.forEach(segment => {
        const partOfBody = document.createElement('div'); 
        partOfBody.style.gridRowStart = segment.y;
        partOfBody.style.gridColumnStart = segment.x;
        partOfBody.classList.add('snake');
        gameBoard.appendChild(partOfBody);
        if(theme) {
            partOfBody.style.background = '#72b570';
            partOfBody.style.border = '.25vmin black solid';
        }
    })
}

export function expandSnake(amount) {
    newSeg += amount;
}

function addSegments(amount){
    for(let i = 0; i < amount; i++) {
        snakeBody.push( { ...snakeBody[snakeBody.length - 1] } )
    }
    newSeg = 0;
}

export function onSnake(pos) {
    return snakeBody.some(segment => {
        return segment.x === pos.x && segment.y === pos.y;
    })
}
export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    for(let i = 1; i < snakeBody.length; i++) {
        if(snakeBody[i].x === snakeBody[0].x &&
           snakeBody[i].y === snakeBody[0].y) return true;
    }
    return false;
}