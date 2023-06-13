class Grid 
{
  constructor(x, y, cell) 
  {
    this.x = x;
    this.y = y;
    this.cell = cell;
    this.evenColor = "#168aad" // cell color
    this.oddColor = "#1a759f" // cell color
  }
    
  place() 
  {
    let i = 0
    for (const elements of this.cell) 
    {
      for (const ele of elements) 
      {
        stroke(0, 0, 0, 100)
        strokeWeight(0.1)
        // Painting the cell
        if(ele.getRevealState()) fill(i % 2 == 0 ? '#d8d5db' : '#adacb8')
        else fill(i % 2 == 0 ? this.evenColor : this.oddColor) 

        rect(ele.getX(), ele.getY(), ele.getSize());
        
        // Painting the text
        if(ele.getRevealState())
        {
          textSize(ele.getTextSize());
          let textColor = color("#2d3142")
          textColor.setAlpha(ele.getTextAlpha())
          fill(textColor)
          text(ele.getIcon(), (ele.getContainsBomb() ? 0 : 10) + ele.getX(), 42+ele.getY());
        }
        i++
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