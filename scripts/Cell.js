class Cell
{
    constructor(size, x, y)
    {
        // Width and Height of the cell
        this.size = size;
        this.x = x;
        this.y = y;
        this.temExplosivo = false;
        this.revelado = false;
        this.textSize = 0; // Max 50
        this.textAlpha = 0; // Max 255
    }

    getX = () => this.x;
    getY = () => this.y;
    getSize = () => this.size;

    setRevelado(valor)
    {
        this.revelado = valor
        this.show()
    }

    show()
    {
        this.textSize = min(this.textSize+5, 50)
        this.textAlpha = min(this.textAlpha+10, 255)
        if(this.textAlpha < 255 || this.textSize < 50)
            setTimeout(() => this.show(), 10);
    }

    getTextAlpha = () => this.textAlpha
    getTextSize = () => this.textSize

    //setRevelado = (valor) => this.revelado = valor;
    getRevelado = () => this.revelado;

    setTemExplosivo = (valor) => this.temExplosivo = valor;
    getTemExplosivo = () => this.temExplosivo;

    setIcone = (valor) => this.icone = valor;
    getIcone = () => this.icone;
}