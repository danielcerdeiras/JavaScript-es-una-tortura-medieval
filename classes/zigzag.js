import enemy from './enemy.js';

export default class Zigzag extends enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir1, dir2)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir1 = dir1;
        this.dir2 = dir2;
        this.cont = 0;
        this.square = level[y][x]; //Guarda el valor de la casilla que ocupa la bala en la matriz para restaurarlo cuando se mueva
    }

    Act()
    {
        let label = this.level[this.posY][this.posX];
        this.level[this.posY][this.posX] = 1;
        let sign = -1;
        if (this.cont % 3 == 0) sign = 1;

        switch(this.dir1)
        {
            case 2:
                if (this.Attempt(this.posX, this.posY, 0, 1))
                    this.posY++;
                else 
                {
                    this.dir1 = 10 - this.dir1;
                    this.posY--;
                }
                break;
                
            case 4:
                if (this.Attempt(this.posX, this.posY, -1, 0))
                    this.posX--;
                else 
                {
                    this.dir1 = 10 - this.dir1;
                    this.posX++;
                }
                break;

            case 6:
                if (this.Attempt(this.posX, this.posY, 1, 0))
                    this.posX++;
                else 
                {
                    this.dir1 = 10 - this.dir1;
                    this.posX--;
                }
                break;
                    
            case 8:
                if (this.Attempt(this.posX, this.posY, 0, -1))
                    this.posY--;
                else 
                {
                    this.dir1 = 10 - this.dir1;
                    this.posY++;
                }
                break;
        }

        switch(this.dir2)
        {
            case 2:
                this.posY += sign;
                break;
                
            case 4:
                this.posX -= sign;
                break;

            case 6:
                this.posX += sign;
                break;
                    
            case 8:
                this.posY -= sign;
                break;
        }

        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        this.level[this.posY][this.posX] = label;
        this.cont++;
        if (this.cont > 3) this.cont = 0;
    }

    Attempt(x, y, xInc, yInc)
    {
        if (this.level[y + yInc][x + xInc] != 2)
        {
            this.level[y + yInc][x + xInc] = this.level[y][x];
            this.level[y][x] = 1;
            return (true);
        }
        else
            return (false);
    }
}