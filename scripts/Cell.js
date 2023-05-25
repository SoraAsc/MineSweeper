class Cell
{
    constructor(tamanho, x, y)
    {
        // largura e altura
        this.tamanho = tamanho;
        this.x = x;
        this.y = y;
        this.temExplosivo = false;
        this.revelado = false;
    }

    getX = () => this.x;
    getY = () => this.y;
    getTamanho = () => this.tamanho;

    getRevelado = () => this.revelado;

    getTemExplosivo = () => this.temExplosivo;
    setTemExplosivo = (valor) => this.temExplosivo = valor;
}