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
				if(this.cell[i][j].getMark()) 
				{
					textSize(35);
					let textColor = color(this.cell[i][j].getTextColor())
					textColor.setAlpha(this.cell[i][j].getTextAlpha())
					textStyle("normal")
					text("🏴‍☠️",this.cell[i][j].getX() + this.x, 38 + this.cell[i][j].getY() + this.y)
				}
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

	checkIfThePlayerWin()
	{
		let revealedCells = 0
		let leftBombsCount = 0
		for(let i = 0; i < this.gridSizeX; i++)
		{
			for(let j = 0; j < this.gridSizeY; j++)
			{
				if(this.cell[i][j].getRevealState() && !this.cell[i][j].getContainsBomb())
					revealedCells++
				else if(this.cell[i][j].getContainsBomb() && !this.cell[i][j].getRevealState())
					leftBombsCount++
			}
		}
		if((this.gridSizeX*this.gridSizeY) - leftBombsCount  == revealedCells)
			return true
		return false
	}
    
}