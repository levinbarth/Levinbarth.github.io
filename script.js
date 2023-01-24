'use-strict';
var canvas = document.getElementById('canvas-id');
var context = canvas.getContext('2d');

var cellLength = 16;

//Startposition der Schlange
var snake = {
    x:0,
    y:0
}

function drawCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x*cellLength, y*cellLength, cellLength-1, cellLength-1)
}

// Funktion zum Bewegen der Schlange
function moveSnake (){
    window.requestAnimationFrame(moveSnake) 
    drawCell(snake.x,snake.y,'black')
    snake.x=snake.x+1
    if(snake.x>24){
        snake.x=0
    }
    drawCell(snake.x, snake.y,'green')

}
moveSnake()