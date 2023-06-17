// ======================== Game State Variables ==========================\\
const GameState = { WAIT: 0, PLAY: 1, WIN: 2, LOSE: 3 }
let CurrentGameState = GameState.WAIT
const holdDuration = 200 // Used to place bomb mark
let holdTimer
// =========================== Grid Variables =============================\\
var grid;
const canvasSizeX = 450, canvasSizeY = 450, cellSize = 50
const topMenuSizeY = 60
let bombsNum = 10, availableFlagsNum = 25
let currentBombsNum = bombsNum, currentAvailableFlagsNum = availableFlagsNum
let gUIRestartButton
// =========================== GUI Variables =============================\\
const selectSizeX = 90
const defaultHtmlPadding = 16 // 1em = 16
let startTime = 0
let elapsedTime = 0
let secondSinceStart = 0, minuteSinceStart = 0
// ============================== Functions ================================\\
function setup() 
{
	// GRID Initial Position

	dropdown = createSelect()
	dropdown.size(selectSizeX, topMenuSizeY / 2)
	dropdown.option("Easy")
	dropdown.option("Medium")
	dropdown.option("Hard")
	dropdown.changed(handleLVChange)

	gUIRestartButton = createButton("Restart")	
	gUIRestartButton.size(200, 30)	
	gUIRestartButton.mousePressed(() => handleLVChange())
	generateField(0, 0, 0)
}

function draw() {
	background('#168aad')
	
	grid.place()
	drawTopMenu()
	if(grid.checkIfThePlayerWin()) drawStateMenu()
}

function handleLVChange()
{
	let optSelected = dropdown.value()
	if(optSelected == "Easy")
	{
		generateField(0, 0, 0)
	} else if(optSelected == "Medium")
	{
		generateField(0, 150, 20)
	} else 
	{
		generateField(50, 150, 30)
	}
}


function generateField(additionalWidth, additionalHeight, additionalBombs)
{
	createCanvas(canvasSizeX + additionalWidth, canvasSizeY + topMenuSizeY + additionalHeight)

	dropdown.position(defaultHtmlPadding + ((canvasSizeX + additionalWidth) / 2) - selectSizeX/2, topMenuSizeY / 2)
	gUIRestartButton.position(defaultHtmlPadding + ((canvasSizeX + additionalWidth) / 2) - 100, height/1.5)
	gUIRestartButton.hide()
	startTime = millis()
	var cell = []
	
	let gridSizeX = floor(((canvasSizeX + additionalWidth)/cellSize))
	let gridSizeY = floor(((canvasSizeY + additionalHeight)/cellSize))
	currentBombsNum = bombsNum + additionalBombs
	currentAvailableFlagsNum = availableFlagsNum

	for(let i = 0; i < gridSizeX; i++)
	{ 
		cell.push([]);
		for(let j = 0; j < gridSizeY; j++)		
			cell[i].push(new Cell(cellSize, i*cellSize, j*cellSize));
	}

	// Insert the bombs (skull)
	while (currentBombsNum > 0) 
	{
		let gridLine = Math.floor(Math.random() * gridSizeX)
		let gridCol = Math.floor(Math.random() * gridSizeY)
		if(!cell[gridLine][gridCol].getContainsBomb())
		{
			cell[gridLine][gridCol].placeBomb(true)
			cell[gridLine][gridCol].setIcon("☠")
			currentBombsNum--;
		}  
	}

	// Calc neighboors numbers
	for(let i = 0; i < gridSizeX; i++)
	{ 
		for(let j = 0; j < gridSizeY; j++)
		{
			let bomb_num = 0
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
		+ (minuteSinceStart > 9 ? minuteSinceStart : "0" + minuteSinceStart) + ":"
		+ (secondSinceStart > 9 ? secondSinceStart : "0" + secondSinceStart), 0, topMenuSizeY / 1.5)
	// 🏴‍☠️ 🚩 ⏰
	text("🏴‍☠️"+currentAvailableFlagsNum, width - (topMenuSizeY * 1.5), topMenuSizeY / 1.5)
} 

// Draw Win and Lose Menu
function drawStateMenu()
{
	fill(0,0,0, 100)
	rect(width / 4, height / 4, width / 2, height / 2)
	textSize(30)
	fill(255,255,255)
	text("You Win", width / 2 - 60, height / 2)
	gUIRestartButton.show()
}


function mouseClicked() {
	let x = Math.floor(mouseX/cellSize);
	let y = Math.floor((mouseY - topMenuSizeY)/cellSize);
	if(grid.getCell(x, y) && !grid.getCell(x, y).getRevealState() && !grid.checkIfThePlayerWin())
	{
		if(grid.getCell(x, y).getMark())
		{
			grid.getCell(x, y).setMark(false)
			currentAvailableFlagsNum++
		}
		grid.getCell(x,y).setRevealState(true);
		if(grid.getCell(x, y).getIcon() == " ")
			reveal(x, y);
	}
}

function mousePressed()
{
	holdTimer = setTimeout(placeMark, holdDuration)
}

function placeMark()
{
	let x = Math.floor(mouseX/cellSize);
	let y = Math.floor((mouseY - topMenuSizeY)/cellSize);
	if(grid.getCell(x, y) && !grid.getCell(x, y).getRevealState())
	{
		// Place Mark
		if(grid.getCell(x, y).getMark())
		{
			grid.getCell(x, y).setMark(false)
			currentAvailableFlagsNum++
		}			
		else if(currentAvailableFlagsNum > 0 && !grid.getCell(x, y).getMark())
		{
			grid.getCell(x, y).setMark(true)
			currentAvailableFlagsNum--
		}	
	}
}

function mouseReleased()
{
	clearTimeout(holdTimer)
}

function reveal(x, y)
{
	for(let i = x-1; i < x+2; i++)
  	{
		for(let j = y-1; j < y+2; j++)
		{
			if((i == x && j == y) || grid.getCell(i, j) == null || grid.getCell(i, j).getRevealState()) continue;

			if(grid.getCell(i, j).getMark())
			{
				grid.getCell(i, j).setMark(false)
				currentAvailableFlagsNum++
			}

			if(!grid.getCell(i, j).getContainsBomb())
				grid.getCell(i, j).setRevealState(true);

			if(grid.getCell(i, j).getIcon() == " ")  
				reveal(i, j);
		}
  	}
}