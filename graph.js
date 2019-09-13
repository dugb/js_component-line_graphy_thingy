// Realtime line graphy thingy example.

/**
 * Calibrate Graph has the following properties:
 * - Height
 * - Width
 * - Width Increment
 */
class CalibrateGraph {
  constructor(canvas, width, height, widthIncrement) {
    this.width = width;
    this.height = height;
    this.widthIncrement = widthIncrement;
    this.canvas = canvas;
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 1;
    this.graphX = [];
    for (let i = 0; i <= this.width; i+=this.widthIncrement){
      this.graphX.push(i);
  }

  }

  // methods
  clear(){
    this.ctx.clearRect(0,0,this.width, this.height);
  }

  /**
   * @param {number} value
   * @param {string} color
   */  
  drawLine(value, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height - value);
    this.ctx.lineTo(this.width, this.height - value);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  /**
   * @param {Array} values
   * @param {string} color
   */
  drawValues(values, color) {
    this.ctx.moveTo(0,0);
    this.ctx.beginPath();
    for (let i = 0; i<this.graphX.length; i++){  
      this.ctx.lineTo(this.graphX[i], this.height-values[i]);
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
      }  
  }
}

class Tool {
  constructor(option, maxValuesLength) {
    this.option = option;
    this._maxValue = 0;
    this._currentValue = 0;
    this.maxValuesLength = maxValuesLength;
    // current and previous values.
    this._values = Array(this.maxValuesLength).fill(0);
  }

  get maxValue(){
    return this._maxValue;
  }
  
  get currentValue(){
    return this._currentValue;
  }
  
  /**
   * @param {number} v
   */
  set currentValue(v){
    this._currentValue = v;
    if (this.values.length > this.maxValuesLength){
      this._values.shift();
    }
    this._values.push(this._currentValue);
    if (this._currentValue > this._maxValue){
      this._maxValue = this._currentValue;
    }
  }

  get values(){
    return this._values;
  }

}

const WIDTH = 800;
const HEIGHT = 200;
const INCREMENT = 5;
let MAX = 0;
let NOW = 0;

const calibrateGraph = new CalibrateGraph(document.getElementById('graph_canvas2'), WIDTH, HEIGHT, INCREMENT);
const tool = new Tool(1, WIDTH/INCREMENT);

function run() {
  console.log(tool.values);
  const nowScore = getRandomInt(HEIGHT-20);
  tool.currentValue = nowScore;
  calibrateGraph.clear();
  calibrateGraph.drawValues(tool.values, 'black');
  calibrateGraph.drawLine(tool.currentValue, 'green');
  calibrateGraph.drawLine(tool.maxValue, 'red');
  
}

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
  console.log(y.length);
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
        run();
    }            
    setInterval(update, 250);
}