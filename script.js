'use-strict';
var canvas = document.getElementById('canvas-id');
var context = canvas.getContext('2d');

var cellLength = 16;

//Startposition der Schlange
var speedCounter
var snake
var newDirection

function resetGame(){
  context.clearRect(0,0,canvas.width,canvas.height)
  speedCounter = 0
  snake = {
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
  newDirection = 'r'
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
  if(snake.direction === 'd'){
    var newY = snake.cells[0].y + 1
    if(newY === 25){
        newY=0
    }
    return newY
  }  
  if(snake.direction === 'u'){
    var newY = snake.cells[0].y - 1
    if(newY === -1){
        newY=24
    }
    return newY
  }
  return snake.cells[0].y
}
function doesSnakeContain(x, y){
  var snakeContains = false
  snake.cells.forEach(function (cell){
    if(x===cell.x && y===cell.y){
      snakeContains = true
    }
  })
 return snakeContains
}

// Funktion zum Bewegen der Schlange
function moveSnake (){
    window.requestAnimationFrame(moveSnake)
    speedCounter=speedCounter+1
    if(speedCounter<6){
        return
    }
    speedCounter=0


    drawCell(snake.cells[snake.length-1].x, snake.cells[snake.length-1].y ,'black')
  
    snake.direction = newDirection;
    var newX = getNewX()
    var newY = getNewY()
    if(doesSnakeContain(newX,newY)){
      resetGame()
      return
    }

    snake.cells.unshift({x: newX, y: newY})
    snake.cells.pop()
    drawCell(snake.cells[0].x, snake.cells[0].y,'green')

}

document.addEventListener('keydown', function(input) {
    switch(input.key) {
        case  'ArrowLeft':
          if(snake.direction !== 'r') {
            newDirection = 'l';
          }
          break;
    
        case  'ArrowRight':
          if(snake.direction !== 'l') {
            newDirection = 'r';
          }
          break;
        
        case  'ArrowUp':
            if(snake.direction !== 'd') {
              newDirection = 'u';
            }
            break;
        
         case  'ArrowDown':
            if(snake.direction !== 'u') {
              newDirection = 'd';
            }
            break;
        default:
          // code block
      }
})

// start game
resetGame()
moveSnake()
