class Cell
{
    constructor(size, x, y)
    {
        // Width and Height of the cell
        this.size = size;
        this.x = x;
        this.y = y;
        this.containsBomb = false;
        this.revealState = false; // The cell start hidden
        this.textSize = 0; // Max 50
        this.textAlpha = 0; // Max 255
    }

    getX = () => this.x;
    getY = () => this.y;
    getSize = () => this.size;


    showAnimation()
    {
        this.textSize = min(this.textSize+5, 50)
        this.textAlpha = min(this.textAlpha+10, 255)
        if(this.textAlpha < 255 || this.textSize < 50)
            setTimeout(() => this.showAnimation(), 10);
    }

    getTextAlpha = () => this.textAlpha
    getTextSize = () => this.textSize

    setRevealState(newValue)
    {
        this.revealState = newValue
        this.showAnimation()
    }
    getRevealState = () => this.revealState;

    placeBomb = (newValue) => this.containsBomb = newValue;
    getContainsBomb = () => this.containsBomb;

    setIcon = (newValue) => this.icon = newValue;
    getIcon = () => this.icon;
}