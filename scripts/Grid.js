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
      }
    }
    //rect(this.x, this.y, 50, 50);
  }

  getCell(x, y) 
  {
    if(this.cell[x] && this.cell[x][y])
      return this.cell[x][y].getRevelado();
    else return true;
  }
    
}