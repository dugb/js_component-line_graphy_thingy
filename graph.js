// Realtime line graphy thingy example.

const WIDTH = 800;
const HEIGHT = 200;
let MAX = 0;
let NOW = 0;

const graphCanvas = document.getElementById('graph_canvas');
const graphCtx = graphCanvas.getContext('2d');
graphCanvas.width = WIDTH;
graphCanvas.height = HEIGHT;
graphCtx.lineWidth = 1;

let y = Array(WIDTH/5).fill(0);
let x = [];
for (let i = 0; i <= WIDTH; i+=5){
    x.push(i);
}

// everytime we draw I want to only add one point to Y
// when the Y array reaches max length, shift and push to keep the array at max length

function draw(){
    graphCtx.clearRect(0,0,graphCanvas.width, graphCanvas.height);
    graphCtx.moveTo(0,0);
    graphCtx.beginPath();

    const newY = getRandomInt(HEIGHT-20);

    if (y.length > WIDTH/5){
        y.shift();
    }
    y.push(newY);
    NOW = newY;

    for (let i = 0; i<x.length; i++){  
        graphCtx.lineTo(x[i], HEIGHT-y[i]);
        graphCtx.strokeStyle = "black";
        graphCtx.stroke();
        if (y[i]>MAX){
            MAX=y[i]
        }
    }

    // Current Value (NOW) line.
    graphCtx.beginPath();
    graphCtx.moveTo(0, HEIGHT-NOW);
    graphCtx.lineTo(WIDTH, HEIGHT-NOW);
    graphCtx.strokeStyle = "red";
    graphCtx.stroke();
    
    // MAX value line.
    graphCtx.beginPath();
    graphCtx.moveTo(0, HEIGHT-MAX);
    graphCtx.lineTo(WIDTH, HEIGHT-MAX);
    graphCtx.strokeStyle = "green";
    graphCtx.stroke(); 
}

// Reset Button onClick
function resetButtonClickHander(){
    y = Array(WIDTH/5).fill(0);
    NOW = 0;
    MAX = 0;
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

window.onload = function() {
    function update() {
        draw();
    }            
    setInterval(update, 250);
}