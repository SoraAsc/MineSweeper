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
  for(var i = 0; i < (canvasSize/cellSize); i++)
  { 
    for(var j = 0; j < (canvasSize/cellSize); j++)
    {
      var bomb_num = 0
      if(!cell[i][j].getTemExplosivo())
      {
        //Horizontal
        if(cell[i-1] && cell[i-1][j].getTemExplosivo()) bomb_num+=1;
        if(cell[i+1] && cell[i+1][j].getTemExplosivo()) bomb_num+=1;
        // //Vertical
        if(cell[i][j-1] && cell[i][j-1].getTemExplosivo()) bomb_num+=1;
        if(cell[i][j+1] && cell[i][j+1].getTemExplosivo()) bomb_num+=1;

        //Diagonal Superior
        if(cell[i+1] && cell[i+1][j-1] && cell[i+1][j-1].getTemExplosivo()) bomb_num+=1;
        if(cell[i-1] && cell[i-1][j-1] && cell[i-1][j-1].getTemExplosivo()) bomb_num+=1;

        //Diagonal Inferior
        if(cell[i+1] && cell[i+1][j+1] && cell[i+1][j+1].getTemExplosivo()) bomb_num+=1;
        if(cell[i-1] && cell[i-1][j+1] && cell[i-1][j+1].getTemExplosivo()) bomb_num+=1;
        cell[i][j].setIcone(bomb_num == 0 ? "0" : str(bomb_num));
      }
    }
  }


  grid = new Grid(0, 0, cell);
}

function draw() {
  background('blue');
  grid.place();

  //text(`Mouse: (${mouseX}, ${mouseY})`, 10, 20);
  //text(`Posição Grid: (${Math.floor(mouseX/cellSize)}, ${Math.floor(mouseY/cellSize)})`, 10, 20);
  //text(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`, 10, 20);
  //text(`Touch: (${touches[0] ? touches[0].x : ''}, ${touches[0] ? touches[0].y : ''})`, 10, 40);
}

function mouseClicked() {
  var x = Math.floor(mouseX/cellSize);
  var y = Math.floor(mouseY/cellSize);

  //console.log(x+" e "+y)
  if(grid.getCell(x, y))
  {
    grid.getCell(x, y).setRevelado(true);
  }

  // Handle mouse click event
  //text(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`, 10, 20);
  //console.log(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`);
  //console.log(`Mouse clicked at (${mouseX}, ${mouseY})`);
}

function touchStarted() {
  // Handle touch event
  //console.log(`Touch started at (${touches[0] ? touches[0].x : ''}, ${touches[0] ? touches[0].y : ''})`);
}