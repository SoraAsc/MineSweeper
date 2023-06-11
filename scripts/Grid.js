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
        // noStroke()
        let textColor = color(255, 0, 0)
        textColor.setAlpha(ele.getTextAlpha())
        fill(textColor)
        textSize(ele.getTextSize());
        rect(ele.getX(), ele.getY(), ele.getTamanho());
        if(ele.getRevelado())
          text(ele.getIcone(), (ele.getTemExplosivo() ? 0 : 10) + ele.getX(), 42+ele.getY());


      }
    }
  }

  getCell(x, y) 
  {
    if(this.cell[x] && this.cell[x][y])
      return this.cell[x][y];
    return null;
  }
    
}