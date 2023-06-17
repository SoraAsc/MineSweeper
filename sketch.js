// ======================== Game State Variables ==========================\\
const GameState = { WAIT: 0, PLAY: 1, WIN: 2, LOSE: 3 }
let CurrentGameState = GameState.WAIT
// =========================== Grid Variables =============================\\
var grid;
var canvasSizeX = 450, canvasSizeY = 450, cellSize = 50
var topMenuSizeY = 60
var bombsNum = 10, availableFlagsNum = 25
// =========================== GUI Variables =============================\\
var selectSizeX = 90
var defaultHtmlPadding = 16 // 1em = 16
let startTime = 0
let elapsedTime = 0
let secondSinceStart = 0, minuteSinceStart = 0
// ============================== Functions ================================\\
function setup() 
{
	// GRID Initial Position
	createCanvas(canvasSizeX, canvasSizeY + topMenuSizeY);
	startTime = millis()
	var cell = []

	var gridSizeX = floor((canvasSizeX/cellSize))
	var gridSizeY = floor(((canvasSizeY)/cellSize))

	for(let i = 0; i < gridSizeX; i++)
	{ 
		cell.push([]);
		for(let j = 0; j < gridSizeY; j++)		
			cell[i].push(new Cell(cellSize, i*cellSize, j*cellSize));
		
	}

	// Insert the bombs (skull)
	while (bombsNum > 0) 
	{
		let gridLine = Math.floor(Math.random() * (canvasSizeX/cellSize));
		let gridCol = Math.floor(Math.random() * (canvasSizeY/cellSize));
		if(!cell[gridLine][gridCol].getContainsBomb())
		{
			cell[gridLine][gridCol].placeBomb(true)
			cell[gridLine][gridCol].setIcon("☠")
			bombsNum--;
		}  
	}

	// Calc neighboors numbers
	for(let i = 0; i < gridSizeX; i++)
	{ 
		for(let j = 0; j < gridSizeY; j++)
		{
			var bomb_num = 0
			if(!cell[i][j].getContainsBomb())
			{
				// Horizontal
				if(cell[i-1] && cell[i-1][j].getContainsBomb()) bomb_num+=1;
				if(cell[i+1] && cell[i+1][j].getContainsBomb()) bomb_num+=1;
				// Vertical
				if(cell[i][j-1] && cell[i][j-1].getContainsBomb()) bomb_num+=1;
				if(cell[i][j+1] && cell[i][j+1].getContainsBomb()) bomb_num+=1;

				// Upper Diagonal
				if(cell[i+1] && cell[i+1][j-1] && cell[i+1][j-1].getContainsBomb()) bomb_num+=1;
				if(cell[i-1] && cell[i-1][j-1] && cell[i-1][j-1].getContainsBomb()) bomb_num+=1;

				// Bottom Diagonal
				if(cell[i+1] && cell[i+1][j+1] && cell[i+1][j+1].getContainsBomb()) bomb_num+=1;
				if(cell[i-1] && cell[i-1][j+1] && cell[i-1][j+1].getContainsBomb()) bomb_num+=1;
				cell[i][j].setIcon(bomb_num == 0 ? " " : str(bomb_num));
			}
		}
	}
	grid = new Grid(0, topMenuSizeY, cell, gridSizeX, gridSizeY);


	dropdown = createSelect()
	dropdown.position(defaultHtmlPadding + (canvasSizeX / 2) - selectSizeX/2, topMenuSizeY / 2)
	dropdown.size(selectSizeX, topMenuSizeY / 2)
	dropdown.option("Easy")
	dropdown.option("Medium")
	dropdown.option("Hard")
}

function draw() {
	background('#168aad');
	grid.place()
	drawTopMenu()
}

function drawTopMenu()
{
	fill(180, 171, 72, 150)
	rect(0, 0, width, topMenuSizeY)
	textSize(topMenuSizeY / 2)
	textStyle("italic")
	fill(255, 255, 255, 200)
	elapsedTime = millis() - startTime
	secondSinceStart = int((elapsedTime/1000)%60)
	if(elapsedTime >= 60000)
	{
		startTime = millis()
		minuteSinceStart++;
	}
	
	text("⏰ "
		+ (minuteSinceStart > 9 ? minuteSinceStart : "0" + minuteSinceStart) +":"
		+ (secondSinceStart > 9 ? secondSinceStart : "0" + secondSinceStart), 0, topMenuSizeY / 1.5)
	// 🏴‍☠️ 🚩 ⏰
	text("🏴‍☠️"+availableFlagsNum, width - (topMenuSizeY * 1.5), topMenuSizeY / 1.5)
} 

// Draw Win and Lose Menu
function drawStateMenu()
{
	fill(0,0,0, 100)
	rect(width / 4, height / 4, width / 2, height / 2)
	textAlign(CENTER)
}


function mouseClicked() {
	var x = Math.floor(mouseX/cellSize);
	var y = Math.floor((mouseY - topMenuSizeY)/cellSize);
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