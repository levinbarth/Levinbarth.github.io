//Helps
'use-strict';

//Variablen 
var canvas = document.getElementById('canvas-id');
var context = canvas.getContext('2d');
var cellLength = 16;
var speedCounter
var snake
var applePosition
var newDirection

function drawCell(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x*cellLength, y*cellLength, cellLength-1, cellLength-1)
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

//Apple Random Place
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function placeApple(){
  var posX
  var posY
  do{
    posX = getRandomInteger(0, 24)
    posY = getRandomInteger(0, 24)
  } while(doesSnakeContain(posX, posY))
  drawCell(posX, posY, 'red')
  applePosition = {
    x: posX,
    y: posY,
  }
}

//Reset Game
function resetGame(){
  context.clearRect(0,0,canvas.width,canvas.height)
  speedCounter = 0
  snake = {
    cells: [
        {x:1,y:0},
        {x:0,y:0},
    ],
    length: 2,
    direction: 'r'
  }
  newDirection = 'r'
  placeApple()
}

//Richtung
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
function writeScore(){
  var highScore = document.getElementById('highScore')
    highScore.textContent = localStorage.getItem("score");
}
// Funktion zum Bewegen der Schlange
function moveSnake (){
    speedCounter=speedCounter+1
    if(speedCounter<6){
      window.requestAnimationFrame(moveSnake)
        return
    }
    speedCounter=0
    //right Highscore
    
    
    
    // Score ausgeben
    // element in variable speichern document.getElementById('canvas-id')
    // element textContent auf snake-länge setzen
    var score = document.getElementById('score');
    score.textContent = snake.length-2
    

    //Hintere zeile fällt ab 
    drawCell(snake.cells[snake.length-1].x, snake.cells[snake.length-1].y ,'black')
  
    snake.direction = newDirection;
    var newX = getNewX()
    var newY = getNewY()
    if(doesSnakeContain(newX,newY)){
      // end game
      if(highScore.textContent<snake.length-2){
        localStorage.setItem('score', snake.length-2);
      }
      writeScore()
      return
    }
    
    //Apple POP
    snake.cells.unshift({x: newX, y: newY})
    if (newX === applePosition.x && newY === applePosition.y){
      snake.length++
      placeApple()
    } else {
      snake.cells.pop()
    }

    drawCell(snake.cells[0].x, snake.cells[0].y,'green')

    window.requestAnimationFrame(moveSnake)
}
//Tasten Imput
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
writeScore()

var button = document.getElementById('clickButten')
button.onclick = function () {
  // start game
  resetGame()
  moveSnake()
}
