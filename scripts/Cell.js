class Cell
{
    constructor(tamanho, x, y, temExplosivo)
    {
        // largura e altura
        this.tamanho = tamanho;
        this.x = x;
        this.y = y;
        this.temExplosivo = temExplosivo;
        this.revelado = false;
    }

    getX = () => this.x;
    getY = () => this.y;
    getTamanho = () => this.tamanho;

    getRevelado = () => this.revelado;
}