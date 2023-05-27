var grid = new Grid(0,0, [,]);
var cellSize = 50, canvasSize = 450, bombsNum = 10;
function setup() 
{
  createCanvas(canvasSize, canvasSize);
  // Posição Inicial da Grid.
  var cell = []
  for(var i = 0; i < (canvasSize/cellSize); i++)
  { 
    cell.push([]);
    for(var j = 0; j < (canvasSize/cellSize); j++)
    {
        cell[i].push(new Cell(cellSize, i*cellSize, j*cellSize, true));
    }
  }

  // Inserir Bombas
  while (bombsNum > 0) 
  {
    var linha = Math.floor(Math.random() * (canvasSize/cellSize));
    var coluna = Math.floor(Math.random() * (canvasSize/cellSize));
    if(!cell[linha][coluna].getTemExplosivo())
    {
      cell[linha][coluna].setTemExplosivo(true);
      cell[linha][coluna].setIcone("☠");
      bombsNum--;
    }    
  }

  // Setar Números


  grid = new Grid(0, 0, cell);
}

function draw() {
  background('blue');
  grid.place();
  //textSize(50)
  //text("1", 10+50*0, 42+50*0)
  //text(`Mouse: (${mouseX}, ${mouseY})`, 10, 20);
  //text(`Posição Grid: (${Math.floor(mouseX/cellSize)}, ${Math.floor(mouseY/cellSize)})`, 10, 20);
  //text(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`, 10, 20);
  //text(`Touch: (${touches[0] ? touches[0].x : ''}, ${touches[0] ? touches[0].y : ''})`, 10, 40);
}

function mouseClicked() {
  // Handle mouse click event
  //text(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`, 10, 20);
  //console.log(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`);
  //console.log(`Mouse clicked at (${mouseX}, ${mouseY})`);
}

function touchStarted() {
  // Handle touch event
  //console.log(`Touch started at (${touches[0] ? touches[0].x : ''}, ${touches[0] ? touches[0].y : ''})`);
}