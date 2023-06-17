class Grid 
{
	constructor(x, y, cell, gridSizeX, gridSizeY) 
	{
		this.x = x;
		this.y = y;
		this.cell = cell;
		this.gridSizeX = gridSizeX
		this.gridSizeY = gridSizeY
		this.evenColor = "#168aad" // cell color
		this.oddColor = "#1a759f" // cell color
	}
    
	place() 
	{
		for(let i = 0; i < this.gridSizeX; i++)
		{
			for(let j = 0; j < this.gridSizeY; j++)
			{
				stroke(0, 0, 0, 100)
				strokeWeight(0.1)

				// Painting the cell
				const isEven = (i + j) % 2 === 0;

				if(this.cell[i][j].getRevealState()) fill(isEven ? '#d8d5db' : '#adacb8')
				else fill(isEven ? this.evenColor : this.oddColor) 
				
				rect(this.cell[i][j].getX() + this.x, this.cell[i][j].getY() + this.y, this.cell[i][j].getSize());
				
				// Painting the text
				if(this.cell[i][j].getRevealState())
				{
					textSize(this.cell[i][j].getTextSize());
					let textColor = color(this.cell[i][j].getTextColor())
					textColor.setAlpha(this.cell[i][j].getTextAlpha())
					textStyle("normal")
					fill(textColor)
					text(this.cell[i][j].getIcon(), (this.cell[i][j].getContainsBomb() ? 0 : 10) + 
						this.cell[i][j].getX() + this.x, 42 + this.cell[i][j].getY() + this.y);
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