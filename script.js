'use-strict';
var canvas = document.getElementById('canvas-id');
var context = canvas.getContext('2d');

var cellLength = 16;

function drawCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x*cellLength, y*cellLength, cellLength-1, cellLength-1)
}

drawCell(10, 10, 'green')
drawCell(11, 10, 'green')