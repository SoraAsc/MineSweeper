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
    for (const ele of this.cell) {
      rect(ele.getX(), ele.getY(), ele.getTamanho());
    }
    //rect(this.x, this.y, 50, 50);
  }
    
}