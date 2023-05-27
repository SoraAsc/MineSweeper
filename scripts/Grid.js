class Grid 
{
  constructor(x, y, cell) 
  {
    this.x = x;
    this.y = y;
    this.cell = cell;
  }
    
  place() 
  {
    for (const elementos of this.cell) {
      for (const ele of elementos) {
        rect(ele.getX(), ele.getY(), ele.getTamanho());
        textSize(50);
        text("1", 10+ele.getX(), 42+ele.getY());
      }
    }
  }

  getCell(x, y) 
  {
    if(this.cell[x] && this.cell[x][y])
      return this.cell[x][y].getTemExplosivo();
  }
    
}