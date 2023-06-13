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
    if(!cell[linha][coluna].getContainsBomb())
    {
      cell[linha][coluna].placeBomb(true);
      cell[linha][coluna].setIcon("☠");
      bombsNum--;
    }  
      
  }

  // Setar Números
  for(var i = 0; i < (canvasSize/cellSize); i++)
  { 
    for(var j = 0; j < (canvasSize/cellSize); j++)
    {
      var bomb_num = 0
      if(!cell[i][j].getContainsBomb())
      {
        //Horizontal
        if(cell[i-1] && cell[i-1][j].getContainsBomb()) bomb_num+=1;
        if(cell[i+1] && cell[i+1][j].getContainsBomb()) bomb_num+=1;
        // //Vertical
        if(cell[i][j-1] && cell[i][j-1].getContainsBomb()) bomb_num+=1;
        if(cell[i][j+1] && cell[i][j+1].getContainsBomb()) bomb_num+=1;

        //Diagonal Superior
        if(cell[i+1] && cell[i+1][j-1] && cell[i+1][j-1].getContainsBomb()) bomb_num+=1;
        if(cell[i-1] && cell[i-1][j-1] && cell[i-1][j-1].getContainsBomb()) bomb_num+=1;

        //Diagonal Inferior
        if(cell[i+1] && cell[i+1][j+1] && cell[i+1][j+1].getContainsBomb()) bomb_num+=1;
        if(cell[i-1] && cell[i-1][j+1] && cell[i-1][j+1].getContainsBomb()) bomb_num+=1;
        cell[i][j].setIcon(bomb_num == 0 ? " " : str(bomb_num));
      }
    }
  }


  grid = new Grid(0, 0, cell);
}

function draw() {
  background('white');
  grid.place();

  //text(`Mouse: (${mouseX}, ${mouseY})`, 10, 20);
  //text(`Posição Grid: (${Math.floor(mouseX/cellSize)}, ${Math.floor(mouseY/cellSize)})`, 10, 20);
  //text(`Valor: (${grid.getCell(Math.floor(mouseX/cellSize),Math.floor(mouseY/cellSize))})`, 10, 20);
  //text(`Touch: (${touches[0] ? touches[0].x : ''}, ${touches[0] ? touches[0].y : ''})`, 10, 40);
}


function mouseClicked() {
  var x = Math.floor(mouseX/cellSize);
  var y = Math.floor(mouseY/cellSize);
  if(grid.getCell(x, y) && !grid.getCell(x, y).getRevealState())
  {
    grid.getCell(x,y).setRevealState(true);
    if(grid.getCell(x, y).getIcon() == " ")
      Reveal(x, y);
  }
}

function Reveal(x, y)
{
  for(let i = x-1; i < x+2; i++)
  {
    for(let j = y-1; j < y+2; j++)
    {
      if((i == x && j == y) || grid.getCell(i, j) == null || grid.getCell(i, j).getRevealState()) continue;

      if(!grid.getCell(i, j).getContainsBomb())
        grid.getCell(i, j).setRevealState(true);

      if(grid.getCell(i, j).getIcon() == " ")  
        Reveal(i, j);
      
    }
  }
}

function touchStarted() {
  // Handle touch event
  //console.log(`Touch started at (${touches[0] ? touches[0].x : ''}, ${touches[0] ? touches[0].y : ''})`);
}