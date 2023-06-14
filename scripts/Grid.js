class Grid 
{
  constructor(x, y, cell, gridSize) 
  {
    this.x = x;
    this.y = y;
    this.cell = cell;
    this.gridSize = gridSize
    this.evenColor = "#168aad" // cell color
    this.oddColor = "#1a759f" // cell color
  }
    
  place() 
  {
    for(let i = 0; i < this.gridSize; i++)
    {
      for(let j = 0; j < this.gridSize; j++)
      {
        stroke(0, 0, 0, 100)
        strokeWeight(0.1)

        // Painting the cell
        const isEven = (i + j) % 2 === 0;

        if(this.cell[i][j].getRevealState()) fill(isEven ? '#d8d5db' : '#adacb8')
        else fill(isEven ? this.evenColor : this.oddColor) 
        
        rect(this.cell[i][j].getX(), this.cell[i][j].getY(), this.cell[i][j].getSize());
        
        // Painting the text
        if(this.cell[i][j].getRevealState())
        {
          textSize(this.cell[i][j].getTextSize());
          let textColor = color(this.cell[i][j].getTextColor())
          textColor.setAlpha(this.cell[i][j].getTextAlpha())
          fill(textColor)
          text(this.cell[i][j].getIcon(), (this.cell[i][j].getContainsBomb() ? 0 : 10) + 
            this.cell[i][j].getX(), 42 + this.cell[i][j].getY());
        }
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