var grid;
var cellSize = 50, canvasSize = 450;
function setup() 
{
  createCanvas(canvasSize, canvasSize);
  // Posição Inicial da Grid.
  var cell = []
  for(var i = 0; i < (canvasSize/cellSize); i++)
  { 
    for(var j = 0; j < (canvasSize/cellSize); j++)
    {
        cell.push(new Cell(cellSize, i*cellSize, j*cellSize, true));
    }
  }
  grid = new Grid(0, 0, cell);
}

function draw() {
  background('blue');
  grid.place();
}