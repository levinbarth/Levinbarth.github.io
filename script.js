'use-strict';
var canvas = document.getElementById('canvas-id');
var context = canvas.getContext('2d');

var cellLength = 16;

//Startposition der Schlange
var speedCounter
var snake = {
    cells: [
        {x:7,y:0},
        {x:6,y:0},
        {x:5,y:0},
        {x:4,y:0},
        {x:3,y:0},
        {x:2,y:0},
        {x:1,y:0},
        {x:0,y:0},
    ],
    length: 8,
    direction: 'r'

}

function drawCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x*cellLength, y*cellLength, cellLength-1, cellLength-1)
}

function getNewX(){
  if(snake.direction === 'r'){
    var newX = snake.cells[0].x + 1
    if(newX === 25){
        newX=0
    }
    return newX
  }  
  if(snake.direction === 'l'){
    var newX = snake.cells[0].x - 1
    if(newX === -1){
        newX=24
    }
    return newX
  }
  return snake.cells[0].x

}
function getNewY(){
    return 0
}
// Funktion zum Bewegen der Schlange
speedCounter=0
function moveSnake (){
    window.requestAnimationFrame(moveSnake)
    speedCounter=speedCounter+1
    if(speedCounter<6){
        return
    }
    speedCounter=0


    drawCell(snake.cells[snake.length-1].x, snake.cells[snake.length-1].y ,'black')
    
    var newX = snake.cells[0].x + 1
    if(newX === 25){
        newX=0
    }


    var newX = getNewX()
    var newY = getNewY()

    snake.cells.unshift({x: newX, y: newY})
    snake.cells.pop()
    drawCell(snake.cells[0].x, snake.cells[0].y,'green')

}

document.addEventListener('keydown', function(input) {
    switch(input.key) {
        case  'ArrowLeft':
          if(snake.direction !== 'r') {
            snake.direction = 'l';
          }
          break;
    
        case  'ArrowRight':
            if(snake.direction !== 'l') {
              snake.direction = 'r';
            }
            break;
        
        case  'ArrowUp':
                if(snake.direction !== 'd') {
                  snake.direction = 'u';
                }
                break;
        
         case  'ArrowDown':
                     if(snake.direction !== 'u') {
                      snake.direction = 'd';
                    }
                    break;
        default:
          // code block
      }
})
moveSnake()
