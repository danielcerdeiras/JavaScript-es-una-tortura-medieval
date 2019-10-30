import enemy from './enemy.js';

export default class Charger extends enemy
{
    constructor(scene, x, y, width, height, sprite, dir, speed)
    {
        super(scene, x, y, width, height, sprite);
        this.dir = dir;
        this.speed = speed;
    }

    Act()
    {
        switch(this.dir)
        {
            case 1:
                this.posX -= this.speed;
                this.posY += this.speed;
                break;

            case 2:
                this.posY += this.speed;
                break;
                
            case 3:
                this.posX += this.speed;
                this.posY += this.speed;
                break;

            case 4:
                this.posX -= this.speed;
                break;

            case 6:
                this.posX += this.speed;
                break;

            case 7:
                this.posX -= this.speed;
                this.posY -= this.speed;
                break;
                    
            case 8:
                this.posY -= this.speed;
                break;
    
            case 9:
                this.posX += this.speed;
                this.posY -= this.speed;
                break;
        }

        this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);
    }

    ChangeDir()
    {
        this.dir = 10 - this.dir;
    }
}