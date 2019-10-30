import enemy from './enemy.js';

export default class Bullet extends enemy
{
    constructor(scene, x, y, width, height, sprite, dir)
    {
        super(scene, x, y, width, height, sprite);
        this.dir = dir;
    }

    Act()
    {
        switch(this.dir)
        {
            case 1:
                this.posX--;
                this.posY++;
                break;

            case 2:
                this.posY++;
                break;
                
            case 3:
                this.posX++;
                this.posY++;
                break;

            case 4:
                this.posX--;
                break;

            case 6:
                this.posX++;
                break;

            case 7:
                this.posX--;
                this.posY--;
                break;
                    
            case 8:
                this.posY--;
                break;
    
            case 9:
                this.posX++;
                this.posY--;
                break;
        }

        this.x = (this.posX * (this.displayWidth * 2)) + (this.displayWidth);
        this.y = (this.posY * (this.displayHeight * 2)) + (this.displayHeight);

        if (this.posX > 10 || this.posX < 0 || this.posY < 0 ||this.posY > 20)
            return(false);

        else
            return(true);
    }
}