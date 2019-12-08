import enemy from './enemy.js';

export default class Charger extends enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir, speed)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir = dir;
        this.speed = speed;
        this.tween;
    }

    Act()
    {
        this.level[this.posY][this.posX] = 1;
        switch(this.dir)
        {
            case 1:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, -1, 1); i++)
                {
                    this.posX--;
                    this.posY++;
                }
                break;

            case 2:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 0, 1); i++)
                    this.posY++;
                break;
                
            case 3:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 1, 1); i++)
                {
                    this.posX++;
                    this.posY++;
                }
                break;

            case 4:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, -1, 0); i++)
                    this.posX--;
                break;

            case 6:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 1, 0); i++)
                    this.posX++;
                break;

            case 7:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, -1, -1); i++)
                {
                    this.posX--;
                    this.posY--;
                }
                break;
                    
            case 8:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 0, -1); i++)
                    this.posY--;
                break;
    
            case 9:
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 1, -1); i++)
                {
                    this.posX++;
                    this.posY--;
                }
                break;
        }

        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });
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
        {
            this.dir = 10 - this.dir; //Dirección opuesta
            return (false);
        }
    }
}